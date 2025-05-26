import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { DatabaseRepository } from "src/database/database.repository";
import { UpdateUserPasswordDTO } from "src/database/dto/users/updateUserPassword.dto";
import { Users } from "src/database/entity/users.entity";
//import { hash } from "crypto";
@Injectable()
export class UsersService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async deleteUser (user:Users) {
        return await this.databaseRepository.deleteUserById(user);
    }

    async updateUser (user:Users) {
        return this.databaseRepository.updateUser(user);
    }

    async updateUserPassword (user:Users,updateUserPassword:UpdateUserPasswordDTO) {
        //Comprobamos la antigua contraseña
        const userResponse=await this.databaseRepository.login(user);
        const compareHash=await compare(updateUserPassword.lastPassword,userResponse.password);
        
        //Generamos una nueva contraseña
        if (compareHash) {
            const hashedPassword=await hash(updateUserPassword.password,parseInt(process.env.BCRYPT_ROUNDS));
            user.password=hashedPassword;
        } else throw new BadRequestException;

        return this.databaseRepository.updateUser(user);
    }

    async getUser (user: Users) {
        this.databaseRepository.getUserById(user);
    }

}