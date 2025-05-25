import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { DataSource, Equal, Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";
import { BlockchainAccounts } from "./entity/blockchainAccounts.entity";
import { CreateUserDTO } from "./dto/users/createUser.dto";
import { CreateAccountDTO } from "./dto/accounts/createAccount.dto";
import { CreateBlockchainAccountDTO } from "./dto/blockchainAccounts/createBlockchainAccount.dto";
import CreateMovementDTO from "./dto/movements/createMovement.dto";
/**
 * @author Alejandro Darío Fuentefría Oróns
 */
@Injectable()
export class DatabaseRepository {
    cacheMovementsSelect = new Map<number, Set<number>>
    constructor(
        private datasource: DataSource,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        @InjectRepository(Movements)
        private movementsRepository: Repository<Movements>,
        @InjectRepository(BlockchainAccounts)
        private blockchainAccountsRepository: Repository<BlockchainAccounts>
    ) { }

    /**
     *      INSERT/CREATE QUERIES
     * @returns string
     */

    async createUser(user: Users): Promise<Users> {
        const insertResult = await this.usersRepository.insert(user);
        return <Users>insertResult.generatedMaps[0];
    }

    async createAccount(account: Accounts): Promise<Accounts> {
        const insertResult = await this.accountsRepository.insert(account);

        await this.datasource.queryResultCache.remove([`accounts${account.user.id}`]);

        return <Accounts>insertResult.generatedMaps[0];
    }

    async createMovement(movement: Movements): Promise<Movements> {
        let insertResult = await this.movementsRepository.insert(movement);

        //await this.datasource.queryResultCache.remove([`movements${movement.originAccount.id}`]);
        //await this.datasource.queryResultCache.remove([`movements${movement.destinationAccount.id}`]);
        await this.deleteCacheMovementSelects(movement.originAccount.id);
        await this.deleteCacheMovementSelects(movement.destinationAccount.id);
        //await this.datasource.queryResultCache.remove(['movements380']);
        await this.datasource.queryResultCache.remove([`account${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.originAccount.user.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.destinationAccount.user.id}`]);

        if (insertResult.generatedMaps[0]) return <Movements>insertResult.generatedMaps[0];
        else throw "Couldnt Create Movement";

    }

    async createBlockchainAccount(blockchainAccount: BlockchainAccounts) {
        const insertResult = await this.blockchainAccountsRepository.insert(blockchainAccount);
        return <BlockchainAccounts>insertResult.generatedMaps[0];
    }

    /**
     *      LOGIN Queries
     * @returns Users
     */

    async login(user: Users): Promise<Users> {
        let response = await this.usersRepository.findOneOrFail({
            where: {
                email: Equal(user.email),
            }
        });

        return response;
    }

    /**
     *      SELECT QUERIES
     */
    async selectAccountsByUserId(userId: number): Promise<Accounts[]> {
        let response = await this.accountsRepository.find({
            where: {
                user: {
                    id: Equal(userId)
                }
            },
            cache: {
                id: `accounts${userId}`,
                milliseconds: 10
            }
        });
        //console.log(response);
        return response;
    }

    async selectAccountByIdAndUserId(accountId: number, userId: number): Promise<Accounts> {
        return await this.accountsRepository.findOneOrFail({
            select: {},
            where: {
                user: {
                    id: Equal(userId)
                },
                id: Equal(accountId)
            },
            cache: {
                id: `account${accountId}`,
                milliseconds: 10,
            }
        });
    }

    /**
     * 
     * @param accountNumber 
     * @param userId 
     * @returns Account with User
     */

    async getUserById (user:Users) {
        return await this.usersRepository.findOne({
            where:{
                id:Equal(user.id),
            }
        })
    }
    async selectAccountByNumberAndUserId(accountNumber: string, userId: number): Promise<Accounts> {
        return await this.accountsRepository.findOneOrFail({
            where: {
                number: Equal(accountNumber),
                user: {
                    id: Equal(userId)
                },
            },
            relations: {
                user: true
            }
        })
    }

    async selectAccountByNumber(accountNumber: string): Promise<Accounts> {
        return await this.accountsRepository.findOneOrFail({
            where: {
                number: Equal(accountNumber)
            },
            relations: {
                user: true
            }
        })
    }

    async selectBlockChainAccountsByUserId(userId: number) {
        return await this.blockchainAccountsRepository.find({
            where: {
                user: {
                    id: Equal(userId)
                }
            },
            relations: {
                user: true
            }
        })
    }

    async selectBlockChainAccountByIdAndUserId(id: number, userId: number) {
        return await this.blockchainAccountsRepository.findOneOrFail({
            where: {
                user: {
                    id: Equal(userId)
                },
                id: Equal(id)
            },
            relations: {
                user: true
            }
        })
    }

    async selectUserFromAccountId(account: Accounts): Promise<Users> {
        let response = await this.accountsRepository.findOne({
            select: {
                user: {
                    id: true,
                    name: true
                }
            },
            where: { id: Equal(account.id) },
            relations: {
                user: true
            }
        })
        return response.user;
    }

    async selectMovementsFullAccountsUsersFromMovementId(movement: Movements): Promise<Movements> {
        let response = await this.movementsRepository.findOneOrFail({
            where: {
                id: Equal(movement.id),
                originAccount: {
                    user: {
                        id: Equal(movement.originAccount.user.id)
                    }
                }
            },
            relations: {
                originAccount: {
                    user: true
                },
                destinationAccount: {
                    user: true
                }
            }
        })

        return response;
    }
    async selectMovementsFromAccountIdAndUserIdOffset(accountId: number, userId: number, offset: number): Promise<Movements[]> {
        let response = await this.movementsRepository.find({
            select: {
                originAccount: {
                    id: true,
                    number: true,
                    user: {
                        name: true
                    }
                },
                destinationAccount: {
                    id: true,
                    number: true,
                    user: {
                        name: true
                    }
                }
            },
            where: [
                {
                    originAccount: {
                        id: Equal(accountId),
                        user: {
                            id: Equal(userId)
                        }
                    }
                },
                {
                    destinationAccount: {
                        id: Equal(accountId),
                        user: {
                            id: Equal(userId)
                        }
                    }
                }
            ],
            relations: { originAccount: { user: true }, destinationAccount: { user: true } },
            skip: offset,
            take: 25,
            order: {
                id: "DESC"
            },
            cache: {
                id: `movements${accountId}:${offset}`,
                milliseconds: 50000,
                
            }
        })

        await this.createCacheMovementSelects(accountId,offset);
        return response;



    }


    async getOneMovementById(id: number): Promise<Movements> {
        let movementResp = await this.movementsRepository.findOne({
            select: {
                originAccount: {
                    id: true,
                    user: {
                        name: true
                    }
                },
                destinationAccount: {
                    id: true,
                    user: {
                        name: true
                    }
                }
            },
            where: {
                id: Equal(id)
            },
            relations: {
                originAccount: {
                    user: true
                },
                destinationAccount: {
                    user: true
                }
            }
        })
        return movementResp;
    }


    /**
     *      DELETE QUERIES
     */

    async deleteUserById(user: Users) {
        let delResult = await this.usersRepository.delete({
            id: Equal(user.id)
        });

        if (delResult.affected == 0) throw ("Delete Error. 0 Rows Deleted");
    }

    async deleteAccountById(account: Accounts) {
        let delResult = await this.accountsRepository.delete({
            id: Equal(account.id),
            user: {
                id: Equal(account.user.id)
            }
        });

        await this.datasource.queryResultCache.remove([`account${account.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${account.user.id}`]);

        if (delResult.affected == 0) throw ("Delete Error. 0 Rows Deleted");
    }

    async deleteBlockchainAccountById(blockchainAccount: BlockchainAccounts) {
        await this.blockchainAccountsRepository.delete(blockchainAccount);
    }

    async deleteMovementById(movement: Movements) {

        let delStatus = await this.movementsRepository.delete(movement.id);

        //await this.datasource.queryResultCache.remove([`movements${movement.originAccount.id}`]);
        //await this.datasource.queryResultCache.remove([`movements${movement.destinationAccount.id}`]);
        await this.deleteCacheMovementSelects(movement.originAccount.id);
        await this.deleteCacheMovementSelects(movement.destinationAccount.id);
        await this.datasource.queryResultCache.remove([`account${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.originAccount.user.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.destinationAccount.user.id}`]);

        if (delStatus.affected == 0) throw ("Delete Error. 0 Rows Deleted");
    }


    //              UPDATE QUERIES
    async updateUser(user: Users) {
        return await this.usersRepository.save(user);
    }

    async updateAccount(account: Accounts) {
        return await this.accountsRepository.save(account);
    }

    async updateBlockChainAccount(blockChainAccount: BlockchainAccounts) {
        return await this.blockchainAccountsRepository.save(blockChainAccount);
    }

    async updateTransactionExample() {
        //Que quede claro que DataSource es lo que genera el typeORMModule.forroot() y .feature():
        //en databaseModule. Se puede crear datasources por separado pero es poco recomendable.
        //Si creas dos bases de datos con .forRoot, tienes que establecer un name y en .feature(entidad,"nombre")
        //Luego puedes acceder a @DataSource("name").

        /* Transaction with repository(User).manager
        let user=new Users;
        user.name="hola";
        user.password="Como";
        user.email="sd";
        
        await this.usersRepository.manager.transaction(async (x)=>{
           await  x.save(user);
        })
        */

        /* Transaction with queryRunner.
        let queryrunner=this.datasource.createQueryRunner();
        
        await queryrunner.connect();
        await queryrunner.startTransaction();
        await queryrunner.manager.save(user);
        await queryrunner.rollbackTransaction();
        await queryrunner.commitTransaction();
        */
    }

    async createCacheMovementSelects(accountId: number, offset: number) {
        const userMovementsCache = this.cacheMovementsSelect.get(accountId);
        
        if (userMovementsCache) {
            userMovementsCache
            userMovementsCache.add(offset);
        } else {
            const newSet=new Set<number>();
            newSet.add(offset);
            this.cacheMovementsSelect.set(accountId, newSet);
        }
    }

    async deleteCacheMovementSelects(accountId: number) {
        const userMovementsCache=this.cacheMovementsSelect.get(accountId);
        if (userMovementsCache) {
            for (const x of userMovementsCache) {
                await this.datasource.queryResultCache.remove([`movements${accountId}:${x}`,`movements${accountId}:${x}-pagination`])
            }
            /*
            for (let i = 0; i < userMovementsCache.length; i++) {
                const x = userMovementsCache[i];
                console.log(x);
                console.log(`movements${accountId}:${x}`)
                await this.datasource.queryResultCache.remove([`movements${accountId}:${x}`,`movements${accountId}:${x}-pagination`])
            }
            */
            this.cacheMovementsSelect.delete(accountId);
        } else {

        }
    }
}