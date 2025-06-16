import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, Res, UnauthorizedException, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Users } from "src/database/entity/users.entity";
import { Response } from "express";
import { CreateUserDTO } from "src/database/dto/users/createUser.dto";
import { UserLoginDTO } from "src/database/dto/auth/loginUser.dto";
import { plainToInstance } from "class-transformer";

@UsePipes(new ValidationPipe({transform:true}))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @Post('login')
    async loginUser(@Body() userLoginDTO: UserLoginDTO, @Res({passthrough:true}) res: Response) {
        try {
            const user=plainToInstance(Users,userLoginDTO)
            let userLoginResp = await this.authService.loginUser(user);

            res.cookie("JWTToken", userLoginResp.jwtToken, {
                httpOnly: true,
                secure: false,
                expires:new Date("2025-07-30")
            })
            
            return userLoginResp;

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }

    }

    @Post("signin")
    async signInUser(@Body() createUserDTO:CreateUserDTO) {
        try {
            const user=plainToInstance(Users,createUserDTO);
            return await this.authService.signInUser(user);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @Post("logout")
    async logoutUser(@Res({passthrough:true}) res: Response) {
        try {
            res.clearCookie("JWTToken",{httpOnly:true,secure:false,path:"/"});
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }
}

