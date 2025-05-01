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
                secure: false
            })
            
            return userLoginResp;

        } catch (error) {
            throw new UnauthorizedException;
        }

    }

    @Post("signin")
    async signInUser(@Body() createUserDTO:CreateUserDTO) {
        try {
            const user=plainToInstance(Users,createUserDTO);
            return await this.authService.signInUser(user);
        } catch (error) {
            console.error(error);
            throw new BadRequestException;
        }
    }
}

