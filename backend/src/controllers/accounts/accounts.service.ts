import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { Accounts } from "src/database/entity/accounts.entity";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async createAccount (account:Accounts) {
        return await this.databaseRepository.createAccount(account);
    }

    async deleteAccount (account:Accounts) {
        return await this.databaseRepository.deleteAccountById(account);
    }

    updateAccount () {
        
    }

    async listAccount (account:Accounts) : Promise<Accounts> {
        return await this.databaseRepository.selectAccountById(account);
    }

    async listAccounts (account:Accounts) : Promise<Accounts[]> {
        return await this.databaseRepository.selectAccountsByUserId(account);
        
    }

    
}