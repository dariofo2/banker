import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { DataSource, Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";

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
        try {
            await this.accountsRepository.insert({
                userid: userid,
                name: name,
                type: type,
                balance: balance
            });

            await this.datasource.queryResultCache.remove([`accounts${userid}`]);

            return true;
        } catch {
            return false;
        }
    }

    async createMovement(userid: number, originAcc: number, destinationAcc: number, money: number) {
        let res = await this.selectAccountById(userid, originAcc);
        if (res != undefined && res != null) {
            try {
                await this.movementsRepository.insert({
                    origin_account_id: originAcc,
                    destination_account_id: destinationAcc,
                    money: money
                })

                await this.datasource.queryResultCache.remove([`movements${originAcc}`]);
                await this.datasource.queryResultCache.remove([`movements${destinationAcc}`])

                return true;
            } catch {
                return false;
            }
        } else return false;

    }


    /**
     *      LOGIN Queries
     * @returns Users
     */

    async login(username: string, password: string): Promise<Users> {
        let response = await this.usersRepository.findOne({
            where: { name: username, password: password }
        });

        return response;
    }

    /**
     *      SELECT QUERIES
     */
    async selectAccountsByUserId(userid: number): Promise<Accounts[]> {
        let response = await this.accountsRepository.find({
            where: { userid: userid },
            cache: {
                id: `accounts${userid}`,
                milliseconds: 100000
            }
        });
        return response;
    }

    async selectAccountById(userid: number, id: number): Promise<Accounts> {
        return await this.accountsRepository.findOne({
            where: { userid: userid, id: id },
            cache: {
                id: `account${id}`,
                milliseconds: 100000,
            }
        });
    }

    async selectMovementsFromAccountId(userid: number, accountid: number): Promise<Movements[]> {
        let searchUserandAcc = await this.selectAccountById(userid, accountid);

        if (searchUserandAcc != undefined && searchUserandAcc != null) {
            let response = await this.movementsRepository.find({
                where: [
                    { origin_account_id: accountid },
                    { destination_account_id: accountid }
                ],
                order: {
                    id: "DESC"
                },
                cache: {
                    id: `movements${accountid}`,
                    milliseconds: 100000
                }
            })
            return response;
        }


    }


    /**
     *      DELETE QUERIES
     */

    async deleteUserById(id: number) : Promise<boolean> {
        let delResult=await this.usersRepository.delete(id);

        if (delResult.affected==0) return false;
        else return true;
    }

    async deleteAccountById(userid: number, id: number) : Promise<boolean> {
        let delResult = await this.accountsRepository.delete({
            userid: userid,
            id: id
        });

        await this.datasource.queryResultCache.remove([`account${id}`]);
        await this.datasource.queryResultCache.remove([`accounts${userid}`]);

        if (delResult.affected==0) return false;
        else return true;
    }

    async deleteMovementById(userid: number, originAcc: number, id: number, destinationAcc: number) : Promise<boolean> {
        let checkAccountUser = await this.selectAccountById(userid, originAcc);
        if (checkAccountUser != undefined && checkAccountUser != null) {
            let delStatus=await this.movementsRepository.delete({
                id: id,
                origin_account_id: originAcc
            })

            await this.datasource.queryResultCache.remove([`movements${originAcc}`]);
            await this.datasource.queryResultCache.remove([`movements${destinationAcc}`])

            if (delStatus.affected==0) return false;
            else return true;

        } else return false;
    }


    //              UPDATE QUERIES
    async updateUser() {
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