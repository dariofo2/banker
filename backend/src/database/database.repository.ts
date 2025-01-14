import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { DataSource, Equal, Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";
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
    ) { }

    /**
     *      INSERT/CREATE QUERIES
     * @returns string
     */

    async createUser(name: string, password: string, email: string) {
        try {
            let result = await this.usersRepository.insert({
                name: name,
                password: password,
                email: email
            })
            return true;
        } catch {
            return false;
        }

    }

    async createAccount(userid: number, name: string, type: string, balance: number) {
        let account = new Accounts();
        account.user = new Users();
        account.user.id = userid;
        account.name = name;
        account.type = type;
        account.balance = balance;

        try {
            await this.accountsRepository.insert({
                user: {
                    id: userid
                },
                name: name,
                type: type,
                balance: balance
            }

            );

            await this.datasource.queryResultCache.remove([`accounts${userid}`]);

            return true;
        } catch {
            return false;
        }
    }

    async createMovement(userid: number, originAcc: number, destinationAcc: number, money: number, userDestinationId: number) {
        
        try {
            await this.movementsRepository.insert({
                originAccount: {
                    id: originAcc,
                    user: {
                        id: userid
                    }
                },
                destinationAccount: {
                    id: destinationAcc,
                },
                money: money

            });

            await this.datasource.queryResultCache.remove([`movements${originAcc}`]);
            await this.datasource.queryResultCache.remove([`movements${destinationAcc}`]);
            await this.datasource.queryResultCache.remove([`account${destinationAcc}`]);
            await this.datasource.queryResultCache.remove([`account${originAcc}`]);
            await this.datasource.queryResultCache.remove([`accounts${userid}`]);
            await this.datasource.queryResultCache.remove([`accounts${userDestinationId}`]);

            return true;
        } catch {
            return false;
        }
    }


    /**
     *      LOGIN Queries
     * @returns Users
     */

    async login(username: string, password: string): Promise<Users> {
        let response = await this.usersRepository.findOne({
            where: {
                name: Equal(username),
                password: Equal(password)
            }
        });

        return response;
    }

    /**
     *      SELECT QUERIES
     */
    async selectAccountsByUserId(userid: number): Promise<Accounts[]> {
        let response = await this.accountsRepository.find({
            where: {
                user: Equal(userid)
            },
            cache: {
                id: `accounts${userid}`,
                milliseconds: 10
            }
        });
        console.log(response);
        return response;
    }

    async selectAccountById(userid: number, id: number): Promise<Accounts> {
        return await this.accountsRepository.findOne({
            select: {},
            where: {
                user: {
                    id: Equal(userid)
                },
                id: Equal(id)
            },
            cache: {
                id: `account${id}`,
                milliseconds: 10,
            }
        });
    }

    async selectUseridFromAccountId(accountid: number): Promise<number> {
        let response = await this.accountsRepository.findOne({
            where: { id: Equal(accountid) }
        })
        console.log(response.user.id);
        return response.user.id;
    }

    async selectMovementsFromAccountId(userid: number, accountid: number): Promise<Movements[]> {
        let response = await this.movementsRepository.find({
            select: {
                originAccount:{
                    id:true,
                    name:true,
                    user:{
                        name:true
                    }
                },
                destinationAccount:{
                    id:true,
                    name:true,
                    user:{
                        name:true
                    }
                }
            },
            where: [
                {
                    originAccount: {
                        id: Equal(accountid),
                        user: {
                            id:Equal(userid)
                        }
                    }
                },
                {
                    destinationAccount: {
                        id: Equal(accountid),
                        user:{
                            id:Equal(userid)
                        }
                    }
                }
            ],
            relations: {originAccount:{user:true},destinationAccount:{user:true}},
            order: {
                id: "DESC"
            },
            cache: {
                id: `movements${accountid}`,
                milliseconds: 10
            }
        })
        return response;



    }


    /**
     *      DELETE QUERIES
     */

    async deleteUserById(id: number): Promise<boolean> {
        let delResult = await this.usersRepository.delete({
            id: Equal(id)
        });

        if (delResult.affected == 0) return false;
        else return true;
    }

    async deleteAccountById(userid: number, id: number): Promise<boolean> {
        let delResult = await this.accountsRepository.delete({
            id: Equal(id),
            user: {
                id: Equal(userid)
            }
        });

        await this.datasource.queryResultCache.remove([`account${id}`]);
        await this.datasource.queryResultCache.remove([`accounts${userid}`]);

        if (delResult.affected == 0) return false;
        else return true;
    }

    async deleteMovementById(userid: number, originAcc: number, id: number, destinationAcc: number, userDestinationId: number): Promise<boolean> {
        let selectedMovement = await this.movementsRepository.findOne({
            where: {
                id:id,
                originAccount:{
                    id:originAcc,
                    user: {
                        id: userid
                    }
                },
                destinationAccount: {
                    id:destinationAcc
                }
            }
        });

        let delStatus = await this.movementsRepository.delete(selectedMovement.id);

        await this.datasource.queryResultCache.remove([`movements${originAcc}`]);
        await this.datasource.queryResultCache.remove([`movements${destinationAcc}`]);
        await this.datasource.queryResultCache.remove([`account${destinationAcc}`]);
        await this.datasource.queryResultCache.remove([`account${originAcc}`]);
        await this.datasource.queryResultCache.remove([`accounts${userid}`]);
        await this.datasource.queryResultCache.remove([`accounts${userDestinationId}`]);
        if (delStatus.affected == 0) return false;
        else return true;
    }


    //              UPDATE QUERIES
    async updateUser(id: number, name: string, password: string, email: string) {
        let user = new Users();
        user.id = id;
        user.name = name;
        user.password = password;
        user.email = email;

        return await this.usersRepository.save(user);
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