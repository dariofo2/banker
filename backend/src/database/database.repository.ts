import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";

@Injectable()
export class DatabaseRepository {
    constructor (
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        @InjectRepository(Movements)
        private movementsRepository: Repository<Movements>,
    ) {}

    /**
     *      INSERT/CREATE QUERIES
     * @returns string
     */

     async createUser(name:string,password:string,email:string) {
        return await this.usersRepository.insert({
           name: name,
           password: password,
           email: email 
        })
    }

    async createAccount(userid:number,name:string,type:string,balance:number) {
        return await this.accountsRepository.insert({
            userid: 1,
            name: name,
            type: type,
            balance: balance
        });
    }

    async createMovement(originAcc: number,destinationAcc: number,money:number) {
        return this.movementsRepository.insert({
            origin_account_id: originAcc,
            destination_account_id: destinationAcc,
            money: money
        })
    }


    /**
     *      LOGIN Queries
     * @returns Users
     */

    async login(username: string, password: string) : Promise<Users> {
        let response=await this.usersRepository.findOneBy({
            name: username,
            password: password
        });
        
        return response;
    }

    /**
     *      SELECT QUERIES
     */
    async selectAccountsByUserId(id:number) : Promise<Accounts[]> {
        let response=await this.accountsRepository.findBy({
            userid:id
        });
        return response;
    }

    async selectMovementsFromAccountId(id:number) : Promise<Movements[]> {
        let response=await this.movementsRepository.find({
            where: [
            {origin_account_id:id},
            {destination_account_id:id}
            ],
            order: {
                id:"DESC"
            }
        })
        return response;
    }


    /**
     *      DELETE QUERIES
     */

    async deleteUserById (id:number) {
        return await this.usersRepository.delete(id);
    }

    async deleteAccountById (id:number) {
        return await this.accountsRepository.delete(id);
    }

    async deleteMovementById (id:number) {
        return await this.accountsRepository.delete(id);
    }
}