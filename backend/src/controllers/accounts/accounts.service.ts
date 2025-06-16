import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { BullMQClientService } from "src/bullMQ/bullMQClient.service";
import { DatabaseRepository } from "src/database/database.repository";
import { CreateAccountDTO } from "src/database/dto/accounts/createAccount.dto";
import { UpdateAccountDTO } from "src/database/dto/accounts/updateAccount.dto";
import { ListRequestDatatablesDTO } from "src/database/dto/dataTables/listRequestDatatables.dto";
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
        await this.databaseRepository.selectAccountByIdAndUserId(account.id,account.user.id);
        return await this.databaseRepository.deleteAccountById(account);
    }

    async updateAccount (account:Accounts) {
        const accountToUpdate=await this.databaseRepository.selectAccountByIdAndUserId(account.id,account.user.id);
        if (accountToUpdate.type!="blocked") return await this.databaseRepository.updateAccount(account); 
        else throw new BadRequestException ("Account is Blocked");
    }

    async listAccount (account:Accounts) : Promise<Accounts> {
        return await this.databaseRepository.selectAccountByIdAndUserId(account.id,account.user.id);
    }

    async listAccounts (userId:number) : Promise<Accounts[]> {
        return await this.databaseRepository.selectAccountsByUserId(userId);
        
    }

    //      A D M I N       S E R V I C E S

    async adminList (ListRequestDatatablesDTO:ListRequestDatatablesDTO) {
        return await this.databaseRepository.listAdminAccountsByUser(ListRequestDatatablesDTO);
    }  

    async adminUpdate (updateAccountDTO: UpdateAccountDTO) {
        const account=plainToClass(Accounts,updateAccountDTO);
        return await this.databaseRepository.updateAccount(account);
    }
    
}