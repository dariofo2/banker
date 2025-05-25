import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcrypt";
import { DatabaseRepository } from "src/database/database.repository";
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
        if (user.password) {
            const hashedPassword=await hash(user.password,parseInt(process.env.BCRYPT_ROUNDS));
            user.password=hashedPassword;
        }
        return this.databaseRepository.updateUser(user);
    }

    async getUser (user: Users) {
        this.databaseRepository.getUserById(user);
    }

}