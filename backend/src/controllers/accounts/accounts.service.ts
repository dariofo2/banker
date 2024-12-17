import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { Accounts } from "src/database/entity/accounts.entity";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    createAccount (userid:number,name:string,type:string,balance:number) {
        this.databaseRepository.createAccount(userid,name,type,balance);
    }

    deleteAccount (id:number) {
        this.databaseRepository.deleteAccountById(id);
    }

    updateAccount () {
        
    }

    listAccounts (id: number) : Promise<Accounts[]> {
        return this.databaseRepository.selectAccountsByUserId(id);
        
    }
}