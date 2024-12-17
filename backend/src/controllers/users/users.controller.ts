import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";

@UseGuards(MainAuthGuard)
@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Get('create')
    createUser () {
        this.usersService.createUser();
    }

    @Get('delete')
    deleteUser () {

    }

    @Get('update')
    updateUser () {

    }

    @Get('login')
    loginUser () {
        
    }
}