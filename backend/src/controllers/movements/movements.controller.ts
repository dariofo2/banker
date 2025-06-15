import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Headers, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { MovementsService } from "./movements.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Movements } from "src/database/entity/movements.entity";
import { Accounts } from "src/database/entity/accounts.entity";
import CreateMovementDTO from "src/database/dto/movements/createMovement.dto";
import { Users } from "src/database/entity/users.entity";
import { plainToInstance } from "class-transformer";
import { DeleteMovementDTO } from "src/database/dto/movements/deleteMovement.dto";
import { ListMovementsDTO } from "src/database/dto/movements/listMovementsDTO";
import { ListRequestDTO } from "src/database/dto/listRequestDTO";
import { ListResponseDTO } from "src/database/dto/listResponseDTO";
import { ListRequestDatatablesDTO } from "src/database/dto/dataTables/listRequestDatatables.dto";

@UseGuards(MainAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('movements')
export class MovementsController {
    constructor(private movementsService: MovementsService) { }
    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    @Post('create')
    async createMovement(@Req() req, @Body() createMovementDTO: CreateMovementDTO) {
        try {
            const movement = plainToInstance(Movements, createMovementDTO);
            movement.originAccount.user = req.user;

            await this.movementsService.createMovement(movement);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('delete')
    async deleteMovement(@Req() req, @Body() deleteMovementDTO: DeleteMovementDTO) {
        try {
            const movement = plainToInstance(Movements, deleteMovementDTO)
            movement.originAccount = new Accounts;
            movement.originAccount.user = req.user;

            await this.movementsService.deleteMovement(movement);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }

    @Post('list')
    async listMovements(@Req() req, @Body() listRequestDTO: ListRequestDTO<ListMovementsDTO>): Promise<ListResponseDTO<Movements>> {
        console.log(listRequestDTO);
        listRequestDTO.data.originAccount.user = req.user;

        let selectResult = await this.movementsService.listMovements(listRequestDTO);

        return selectResult;
    }


    //      A D M I N      C O N T R O L L E R S
    @Post('adminList')
    async adminList(@Body() ListRequestDatatablesDTO: ListRequestDatatablesDTO) {
        try {
            return await this.movementsService.adminList(ListRequestDatatablesDTO);
        } catch (error) {
            console.error(error);
            throw new BadRequestException("Invalid Data");
        }
    }
}