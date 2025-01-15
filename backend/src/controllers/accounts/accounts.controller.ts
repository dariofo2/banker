import { BadRequestException, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
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
    async createAccount(@Req() req) {
        let response=await this.accountsService.createAccount(req.user.id, req.body.name, req.body.type);
        if (!response) throw new BadRequestException;
    }

    @Post('delete')
    async deleteAccount(@Req() req) {
        let response=await this.accountsService.deleteAccount(req.user.id,req.body.id);
        if (!response) throw new BadRequestException;
    }

    @Post('list')
    async listAccount(@Req() req): Promise<Accounts> {
        return await this.accountsService.listAccount(req.user.id,req.body.id);
    }

    @Post('lists')
    async listAccounts(@Req() req): Promise<Accounts[]> {
        return await this.accountsService.listAccounts(req.user.id);
    }

}