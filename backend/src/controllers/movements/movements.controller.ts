import { Controller, Get } from "@nestjs/common";
import { MovementsService } from "./movements.service";

@Controller('movements')
export class MovementsController{
    constructor (private movementsService: MovementsService) {}
    @Get('create')
    createMovement () {
        return "Created Movement";
    }

    @Get('delete')
    deleteMovement() {
        return "deleted Movement";
    }

    @Get('list')
    listMovement() {
        
    }

}