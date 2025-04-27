import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { DataSource, Equal, Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";
import { BlockchainAccounts } from "./entity/blockchainAccounts.entity";
/**
 * @author Alejandro Darío Fuentefría Oróns
 */
@Injectable()
export class DatabaseRepository {
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

    async createUser(user: Users) {
        let result = await this.usersRepository.insert(user);
    }

    async createAccount(account: Accounts) {
        await this.accountsRepository.insert(account);

        await this.datasource.queryResultCache.remove([`accounts${account.user.id}`]);
    }

    async createMovement(movement: Movements): Promise<Movements> {
        let test = await this.movementsRepository.insert(movement);

        await this.datasource.queryResultCache.remove([`movements${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`movements${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.originAccount.user.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.destinationAccount.user.id}`]);
        
        return <Movements>test.generatedMaps[0];
    }

    async createBlockchainAccount(blockchainAccount:BlockchainAccounts) {
        let test= await this.blockchainAccountsRepository.insert(blockchainAccount);
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
    async selectAccountsByUserId(account:Accounts): Promise<Accounts[]> {
        let response = await this.accountsRepository.find({
            where: {
                user: {
                    id: Equal(account.user.id)
                }
            },
            cache: {
                id: `accounts${account.user.id}`,
                milliseconds: 10
            }
        });
        //console.log(response);
        return response;
    }

    async selectAccountById(account:Accounts): Promise<Accounts> {
        return await this.accountsRepository.findOne({
            select: {},
            where: {
                user: {
                    id: Equal(account.user.id)
                },
                id: Equal(account.id)
            },
            cache: {
                id: `account${account.id}`,
                milliseconds: 10,
            }
        });
    }

    async selectBlockChainAccountsByUserId(user:Users) {
        return await this.blockchainAccountsRepository.findOne({
            where: {
                user: {
                    id:Equal(user.id)
                }
            },
            relations:{
                user:true
            }
        })
    }

    async selectBlockChainAccountById(blockchainAccount:BlockchainAccounts) {
        return await this.blockchainAccountsRepository.findOne({
            where: {
                user: {
                    id:Equal(blockchainAccount.user.id)
                },
                id:Equal(blockchainAccount.id)
            },
            relations:{
                user:true
            }
        })
    }

    async selectUserFromAccountId(account:Accounts): Promise<Users> {
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

    async selectMovementsFullAccountsUsersFromMovementId (movement:Movements) : Promise<Movements> {
        let response = await this.movementsRepository.findOne({
            where:{
                id:Equal(movement.id),
                originAccount:{
                    user: {
                        id:Equal(movement.originAccount.user.id)
                    }
                }
            },
            relations: {
                originAccount:{
                    user:true
                },
                destinationAccount:{
                    user:true
                }
            }
        }) 
        
        return response;
    }
    async selectMovementsFromAccountId(account:Accounts): Promise<Movements[]> {
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
                        id: Equal(account.id),
                        user: {
                            id: Equal(account.user.id)
                        }
                    }
                },
                {
                    destinationAccount: {
                        id: Equal(account.id),
                        user: {
                            id: Equal(account.user.id)
                        }
                    }
                }
            ],
            relations: { originAccount: { user: true }, destinationAccount: { user: true } },
            order: {
                id: "DESC"
            },
            cache: {
                id: `movements${account.id}`,
                milliseconds: 10
            }
        })
        return response;



    }


    async get1Movement(movement:Movements): Promise<Movements> {
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
                id: Equal(movement.id)
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

    async deleteUserById(user:Users) {
        let delResult = await this.usersRepository.delete({
            id: Equal(user.id)
        });

        if (delResult.affected == 0) throw ("Delete Error. 0 Rows Deleted");
    }

    async deleteAccountById(account:Accounts) {
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

    async deleteBlockchainAccountById(blockchainAccount:BlockchainAccounts) {
        await this.blockchainAccountsRepository.delete(blockchainAccount);
    }

    async deleteMovementById(movement:Movements) {
        
        let delStatus = await this.movementsRepository.delete(movement.id);

        await this.datasource.queryResultCache.remove([`movements${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`movements${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.destinationAccount.id}`]);
        await this.datasource.queryResultCache.remove([`account${movement.originAccount.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.originAccount.user.id}`]);
        await this.datasource.queryResultCache.remove([`accounts${movement.destinationAccount.user.id}`]);
        
        if (delStatus.affected == 0) throw ("Delete Error. 0 Rows Deleted");
    }


    //              UPDATE QUERIES
    async updateUser(user:Users) {
        return await this.usersRepository.save(user);
    }

    async updateBlockChainAccount (blockChainAccount:BlockchainAccounts) {
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


}