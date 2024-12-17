import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";

@UseGuards(MainAuthGuard)
@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Get('create')
    createUser (name:string,password:string,email:string) {
        this.usersService.createUser(name,password,email);
    }

    @Get('delete')
    deleteUser (@Body() body: Users) {
        this.usersService.deleteUser(body.id);
    }

    @Get('update')
    updateUser () {

    }

    @Get('login')
    loginUser (@Body() body:Users) {
        this.usersService.login(body.name,body.password);
    }
}