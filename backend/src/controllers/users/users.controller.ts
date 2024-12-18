import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";


@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Post('create')
    createUser (@Body() body ,@Req() req) {
        this.usersService.createUser(body.name,body.password,body.email);
    }

    @UseGuards(MainAuthGuard)
    @Post('delete')
    deleteUser (@Body() body: Users,@Req() req) {
        this.usersService.deleteUser(body.id);
    }

    @UseGuards(MainAuthGuard)
    @Post('update')
    updateUser () {

    }

}