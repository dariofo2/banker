import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { instanceToPlain, plainToClass, plainToInstance } from "class-transformer";

import { DatabaseRepository } from "src/database/database.repository";
import { UserLoginResp } from "src/database/dto/auth/userLoginResp.dto";
import { CreateUserDTO } from "src/database/dto/users/createUser.dto";
import { Users } from "src/database/entity/users.entity";

@Injectable()
export class AuthService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private jwtService: JwtService
    ) { }
    async loginUser(user: Users): Promise<UserLoginResp> {
        //const hashedPassword=hash("sha256",user.password,"hex");

        let loginResp = await this.databaseRepository.login(user);
        
        const isValidPasswords = await compare(user.password, loginResp.password);
        if (!isValidPasswords) throw "Bad Login Email or Password";
        
        const payload = { id: loginResp.id, name: loginResp.name, email: loginResp.email, photo: loginResp.photo,role: loginResp.role };
        const jwtToken = await this.jwtService.signAsync(payload);

        const userRespTransformed=instanceToPlain(loginResp);
        const userLoginResp: UserLoginResp = plainToInstance(UserLoginResp,userRespTransformed);
        userLoginResp.jwtToken = "Bearer " + jwtToken;
        
        return userLoginResp;
    }

    async signInUser (user:Users) {
        //const hashedPassword=hash("sha256",user.password,"hex");
        const hashedPassword=await hash(user.password,parseInt(process.env.BCRYPT_ROUNDS));
        
        user.password=hashedPassword;
        user.role=1;
        
        return await this.databaseRepository.createUser(user);
    }
} 