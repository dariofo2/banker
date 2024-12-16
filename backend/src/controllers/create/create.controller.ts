import { Controller, Get, Post } from "@nestjs/common";
import { CreateService } from "./create.service";

@Controller('create')
export class CreateController {
    constructor (private createService: CreateService) {}
    @Get('user')
    createUser () : string {
        this.createService.createUser();
        return "Usuario Creado";
    }
    
    @Get('account')
    createAccount () : string {
        this.createService.createAccount()
        .then();
        return "Cuenta Creada";
    }

    @Get('movement')
    createMovement () : string {
        this.createService.createMovement();
        return "Movimiento Creado";
    }

}