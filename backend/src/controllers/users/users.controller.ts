import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Get('create')
    createUser () {
        
    }
}