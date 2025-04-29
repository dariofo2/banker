import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Accounts } from "src/database/entity/accounts.entity";
import { Users } from "src/database/entity/users.entity";
import { CreateAccountDTO } from "src/database/dto/accounts/createAccount.dto";
import { plainToClass, plainToInstance, TransformPlainToInstance } from "class-transformer";
import { DeleteAccountDTO } from "src/database/dto/accounts/deleteAccount.dto";
import { GetAccountDTO } from "src/database/dto/accounts/getAccount.dto";
import { UpdateAccountDTO } from "src/database/dto/accounts/updateAccount.dto";

@UseGuards(MainAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    @UsePipes(new ValidationPipe())
    async createAccount(@Req() req: any, @Body() createAccountDTO: CreateAccountDTO) {
        try {
            const account: Accounts = plainToInstance(Accounts, createAccountDTO);
            account.user = req.user;

            await this.accountsService.createAccount(account);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('delete')
    async deleteAccount(@Req() req: any, @Body() deleteAccountDTO: DeleteAccountDTO) {
        try {
            const account = plainToInstance(Accounts, deleteAccountDTO);
            account.user = req.user;

            await this.accountsService.deleteAccount(account);
        } catch {
            throw new BadRequestException;
        }
    }

    @Post('list')
    async listAccount(@Req() req: any, @Body() getAccountDTO: GetAccountDTO): Promise<Accounts> {
        try {
            const account = plainToInstance(Accounts, getAccountDTO);
            account.user = req.user;

            return await this.accountsService.listAccount(account);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('lists')
    async listAccounts(@Req() req: any): Promise<Accounts[]> {
        const user: Users = req.user;
        return await this.accountsService.listAccounts(user.id);
    }

    @Post("update")
    @UsePipes(new ValidationPipe())
    async updateAccount(@Req() req: any, @Body() updateAccountDTO: UpdateAccountDTO) {
        try {
            const account = plainToInstance(Accounts, updateAccountDTO);
            account.user = req.user;
            await this.accountsService.updateAccount(account);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }
}