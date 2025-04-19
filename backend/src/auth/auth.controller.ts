import { BadRequestException, Body, Controller, Post, Res, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Users } from "src/database/entity/users.entity";
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @Post('login')
    async loginUser(@Body() user: Users, @Res() res: Response) {
        try {
            let userLoginResp = await this.authService.loginUser(user);

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

    @Post("signin")
    @UsePipes(new ValidationPipe())
    async signInUser(@Body() user: Users) {
        try {
            await this.authService.signInUser(user);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }
}

