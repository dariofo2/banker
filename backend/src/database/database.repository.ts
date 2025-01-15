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

    async createUser(name: string, password: string, email: string): Promise<boolean> {
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

    async createAccount(userid: number, name: string, type: string): Promise<boolean> {
        try {
            await this.accountsRepository.insert({
                user: {
                    id: userid
                },
                name: name,
                type: type,
                balance: 0
            }

            );

            await this.datasource.queryResultCache.remove([`accounts${userid}`]);

            return true;
        } catch {
            return false;
        }
    }

    async createMovement(userid: number, originAcc: number, destinationAcc: number, money: number, userDestinationId: number): Promise<Movements> {
        try {
            let test = await this.movementsRepository.insert({
                originAccount: {
                    id: originAcc,
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

            return <Movements>test.generatedMaps[0];
        } catch {
            return undefined;
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
                user: {
                    id: Equal(userid)
                }
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

    async selectUserFromAccountId(accountid: number): Promise<Users> {
        let response = await this.accountsRepository.findOne({
            select: {
                user: {
                    id: true,
                    name: true
                }
            },
            where: { id: Equal(accountid) },
            relations: {
                user: true
            }
        })
        return response.user;
    }

    async selectMovementsFromAccountId(userid: number, accountid: number): Promise<Movements[]> {
        let response = await this.movementsRepository.find({
            select: {
                originAccount: {
                    id: true,
                    name: true,
                    user: {
                        name: true
                    }
                },
                destinationAccount: {
                    id: true,
                    name: true,
                    user: {
                        name: true
                    }
                }
            },
            where: [
                {
                    originAccount: {
                        id: Equal(accountid),
                        user: {
                            id: Equal(userid)
                        }
                    }
                },
                {
                    destinationAccount: {
                        id: Equal(accountid),
                        user: {
                            id: Equal(userid)
                        }
                    }
                }
            ],
            relations: { originAccount: { user: true }, destinationAccount: { user: true } },
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


    async get1Movement(id: number): Promise<Movements> {
        let movement = await this.movementsRepository.findOne({
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
        return movement;
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
                id: Equal(id),
                originAccount: {
                    id: Equal(originAcc),
                    user: {
                        id: Equal(userid)
                    }
                },
                destinationAccount: {
                    id: Equal(destinationAcc)
                }
            }
        });

        if (selectedMovement == undefined || selectedMovement == null) return false;

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
        return await this.usersRepository.save({
            id:id,
            name:name,
            password:password,
            email:email
        });
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