import { Injectable } from "@nestjs/common";
import { BullMQClientService } from "src/bullMQ/bullMQClient.service";
import { DatabaseRepository } from "src/database/database.repository";
import { Accounts } from "src/database/entity/accounts.entity";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository,
        private bullMQClientService: BullMQClientService
    ) {}

    async createAccount (account:Accounts) {
        account.number=await this.bullMQClientService.addJobGenerateAccountNumber()
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