import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { Accounts } from "src/database/entity/accounts.entity";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async createAccount (userid:number,name:string,type:string,balance:number) {
        return await this.databaseRepository.createAccount(userid,name,type,balance);
    }

    async deleteAccount (userid:number, id:number) {
        return await this.databaseRepository.deleteAccountById(userid,id);
    }

    updateAccount () {
        
    }

    async listAccount (userid:number,id:number) : Promise<Accounts> {
        return await this.databaseRepository.selectAccountById(userid,id);
    }

    async listAccounts (id: number) : Promise<Accounts[]> {
        return await this.databaseRepository.selectAccountsByUserId(id);
        
    }

    
}