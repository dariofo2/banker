import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";


@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    
    @Post('create')
    async createUser (@Body() body ,@Req() req) {
        let insertresult=await this.usersService.createUser(body.name,body.password,body.email)
        if (!insertresult) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('delete')
    async deleteUser (@Body() body: Users,@Req() req) {
        let delresult=await this.usersService.deleteUser(req.user.id);
        if (!delresult) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('update')
    updateUser (@Req() req) {
        let updatedUser=this.usersService.updateUser(req);
        if (updatedUser==null || updatedUser==undefined) throw new BadRequestException; 
    }

}