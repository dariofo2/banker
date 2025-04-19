import { BadRequestException, Body, Controller, Post, Res, UnauthorizedException } from "@nestjs/common";
import { AuthLoginService } from "./authlogin.service";
import { Users } from "src/database/entity/users.entity";
import { Response } from "express";

@Controller('login')
export class AuthLoginController {
    constructor(
        private authLoginService: AuthLoginService
    ) { }
    @Post('login')
    async loginUser(@Body() user: Users, @Res() res: Response) {
        try {
            let userLoginResp = await this.authLoginService.login(user);

            res.cookie("JWTToken", userLoginResp.jwtToken, {
                httpOnly: true,
                secure: false
            })

            res.send(JSON.stringify(userLoginResp));
            return userLoginResp;

        } catch (error) {
            throw new UnauthorizedException;
        }

    }
}

