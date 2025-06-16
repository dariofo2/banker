import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Accounts } from "src/database/entity/accounts.entity";
import { Users } from "src/database/entity/users.entity";
import { CreateAccountDTO } from "src/database/dto/accounts/createAccount.dto";
import { plainToClass, plainToInstance, TransformPlainToInstance } from "class-transformer";
import { DeleteAccountDTO } from "src/database/dto/accounts/deleteAccount.dto";
import { GetAccountDTO } from "src/database/dto/accounts/getAccount.dto";
import { UpdateAccountDTO } from "src/database/dto/accounts/updateAccount.dto";
import { ListRequestDatatablesDTO } from "src/database/dto/dataTables/listRequestDatatables.dto";
import { AdminAuthGuard } from "src/auth/authRoles/adminAuth.guard";

@UseGuards(MainAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService) { }
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    async createAccount(@Req() req: any, @Body() createAccountDTO: CreateAccountDTO) {
        try {
            const account: Accounts = plainToInstance(Accounts, createAccountDTO);
            account.user = req.user;

            await this.accountsService.createAccount(account);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @Post('delete')
    async deleteAccount(@Req() req: any, @Body() deleteAccountDTO: DeleteAccountDTO) {
        try {
            const account = plainToInstance(Accounts, deleteAccountDTO);
            account.user = req.user;

            await this.accountsService.deleteAccount(account);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
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
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @Post('lists')
    async listAccounts(@Req() req: any): Promise<Accounts[]> {
        const user: Users = req.user;
        return await this.accountsService.listAccounts(user.id);
    }

    @Post("update")
    async updateAccount(@Req() req: any, @Body() updateAccountDTO: UpdateAccountDTO) {
        try {
            const account = plainToInstance(Accounts, updateAccountDTO);
            account.user = req.user;
            await this.accountsService.updateAccount(account);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }


    //      A D M I N      C O N T R O L L E R S
    @UseGuards(AdminAuthGuard)
    @Post('adminList')
    async adminList(@Body() ListRequestDatatablesDTO: ListRequestDatatablesDTO) {
        try {
            return await this.accountsService.adminList(ListRequestDatatablesDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
            
        }
    }

    @UseGuards(AdminAuthGuard)
    @Post('adminUpdate')
    async adminUpdate(@Body() updateAccountDTO: UpdateAccountDTO) {
        try {
            return await this.accountsService.adminUpdate(updateAccountDTO);
        } catch (error) {
            console.error(error);
            throw new BadRequestException("Invalid Data");
        }
    }
}