import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";

@UseGuards(MainAuthGuard)
@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Post('create')
    createUser (@Body() body:Users) {
        this.usersService.createUser(body.name,body.password,body.email);
    }

    @Post('delete')
    deleteUser (@Body() body: Users) {
        this.usersService.deleteUser(body.id);
    }

    @Post('update')
    updateUser () {

    }

    @Post('login')
    loginUser (@Body() body:Users) {
        return this.usersService.login(body.name,body.password);
    }
}