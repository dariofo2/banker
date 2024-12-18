import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";


@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
    ) {}

    @Post('create')
    async createUser (@Body() body ,@Req() req) {
        let insertresult=await this.usersService.createUser(body.name,body.password,body.email)
        if (!insertresult) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('delete')
    async deleteUser (@Body() body: Users,@Req() req) {
        let delresult=await this.usersService.deleteUser(body.id);
        if (delresult.affected==0) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('update')
    updateUser () {

    }

}