import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Accounts } from "src/database/entity/accounts.entity";

@UseGuards(MainAuthGuard)
@Controller('accounts')
export class AccountsController {
    constructor (private accountsService: AccountsService) {}
    @Post('create')
    createAccount (@Req() req: Request) {
        
    }

    @Post('list')
    listAccount (@Req() req: Request) : Promise<Accounts[]> {
        return this.accountsService.listAccounts(1);
    }
}