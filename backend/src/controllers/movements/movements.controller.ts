import { BadRequestException, Body, Controller, Get, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { MovementsService } from "./movements.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Movements } from "src/database/entity/movements.entity";
import { Accounts } from "src/database/entity/accounts.entity";

@UseGuards(MainAuthGuard)
@Controller('movements')
export class MovementsController {
    constructor(private movementsService: MovementsService) { }
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    async createMovement(@Req() req, @Body() movement: Movements) {
        try {
            movement.originAccount.user = req.user;
            
            await this.movementsService.createMovement(movement);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }


    }

    @Post('delete')
    async deleteMovement(@Req() req, @Body() movement: Movements) {
        try {
            movement.originAccount=new Accounts;
            movement.originAccount.user = req.user;
            
            await this.movementsService.deleteMovement(movement);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('list')
    async listMovement(@Req() req, @Body() account:Accounts): Promise<false | Movements[]> {
        account.user=req.user;
        let selectResult = await this.movementsService.listMovements(account);

        return selectResult;
    }

}