import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Accounts } from "src/database/entity/accounts.entity";

@UseGuards(MainAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    //@UsePipes(new ValidationPipe())
    async createAccount(@Req() req: any, @Body() account: Accounts) {
        try {
            //account.balance=0;
            account.user = req.user;
            await this.accountsService.createAccount(account);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('delete')
    async deleteAccount(@Req() req: any, @Body() account: Accounts) {
        try {
            account.user = req.user;
            await this.accountsService.deleteAccount(account);
        } catch {
            throw new BadRequestException;
        }
    }

    @Post('list')
    async listAccount(@Req() req: any, @Body() account: Accounts): Promise<Accounts> {
        account.user = req.user;
        return await this.accountsService.listAccount(account);
    }

    @Post('lists')
    async listAccounts(@Req() req: any, @Body() account: Accounts): Promise<Accounts[]> {
        account.user = req.user;
        return await this.accountsService.listAccounts(account);
    }

}