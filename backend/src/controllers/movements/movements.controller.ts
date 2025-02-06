import { BadRequestException, Body, Controller, Get, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { MovementsService } from "./movements.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Movements } from "src/database/entity/movements.entity";
import { Accounts } from "src/database/entity/accounts.entity";

@UseGuards(MainAuthGuard)
@Controller('movements')
export class MovementsController{
    constructor (private movementsService: MovementsService) {}
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    async createMovement (@Req() req) {
        let res=await this.movementsService.createMovement(req.user.id,req.body.origin_account_id,req.body.destination_account_id,req.body.money);

        if (!res) throw new BadRequestException;
    }

    @Post('delete')
    async deleteMovement(@Req() req) : Promise<any>{
        let delResult= await this.movementsService.deleteMovement(req.user.id,req.body.origin_account_id,req.body.id,req.body.destination_account_id)

        if (!delResult) throw new BadRequestException;
    }

    @Post('list')
    async listMovement(@Req() req) : Promise<false|Movements[]> {
        let selectResult=await this.movementsService.listMovements(req.user.id,req.body.origin_account_id); 

        return selectResult;
    }

}