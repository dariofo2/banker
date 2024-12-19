import { BadRequestException, Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthLoginService } from "./authlogin.service";
import { Users } from "src/database/entity/users.entity";

@Controller('login')
export class AuthLoginController{
    constructor (
        private authLoginService: AuthLoginService
    ) {}
    @Post('login')
    async loginUser (@Body() body:Users) {
        let token = await this.authLoginService.login(body.name,body.password);
        if (token!=null) return token;
        else throw new UnauthorizedException;
    }
}

