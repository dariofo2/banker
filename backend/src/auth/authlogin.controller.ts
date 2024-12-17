import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginService } from "./authlogin.service";
import { Users } from "src/database/entity/users.entity";

@Controller('login')
export class AuthLoginController{
    constructor (
        private authLoginService: AuthLoginService
    ) {}
    @Post('login')
    loginUser (@Body() body:Users) {
        return this.authLoginService.login(body.name,body.password);
    }
}

