import { Injectable } from "@nestjs/common";
import { BullMQClientService } from "src/bullMQ/bullMQClient.service";
import { DatabaseRepository } from "src/database/database.repository";
import { CreateAccountDTO } from "src/database/dto/accounts/createAccount.dto";
import { Accounts } from "src/database/entity/accounts.entity";
import { Users } from "src/database/entity/users.entity";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository,
        private bullMQClientService: BullMQClientService
    ) {}

    async createAccount (account:Accounts) {
        account.number=await this.bullMQClientService.addJobGenerateAccountNumber()
        account.balance=parseInt(process.env.ACCOUNT_INITIAL_BALANCE);

        return await this.databaseRepository.createAccount(account);
    }

    async deleteAccount (account:Accounts) {
        return await this.databaseRepository.deleteAccountById(account);
    }

    updateAccount () {
        
    }

    async listAccount (account:Accounts) : Promise<Accounts> {
        return await this.databaseRepository.selectAccountByIdAndUserId(account.id,account.user.id);
    }

    async listAccounts (userId:number) : Promise<Accounts[]> {
        return await this.databaseRepository.selectAccountsByUserId(userId);
        
    }

    
}