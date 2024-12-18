import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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
    createAccount(@Req() req) {
        console.log(req.user);
        return this.accountsService.createAccount(req.user.id, req.body.name, req.body.type, req.body.balance);
    }

    @Post('delete')
    deleteAccount() {

    }

    @Post('list')
    listAccount(@Req() req): Promise<Accounts[]> {
        return this.accountsService.listAccounts(req.user.id);
    }

    @Post('lists')
    listAccounts(@Req() req): Promise<Accounts[]> {
        return this.accountsService.listAccounts(req.user.id);
    }

}