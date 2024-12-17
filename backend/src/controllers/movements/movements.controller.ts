import { Body, Controller, Get, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { MovementsService } from "./movements.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Movements } from "src/database/entity/movements.entity";
import { Accounts } from "src/database/entity/accounts.entity";

@UseGuards(MainAuthGuard)
@Controller('movements')
export class MovementsController{
    constructor (private movementsService: MovementsService) {}
    @Post('create')
    createMovement () {
        return "Created Movement";
    }

    @Post('delete')
    deleteMovement() {
        return "deleted Movement";
    }

    @Post('list')
    listMovement(@Body() body) {
        let accountId=body.id;
        console.log(accountId);
        return this.movementsService.listMovements(accountId); 
    }

}