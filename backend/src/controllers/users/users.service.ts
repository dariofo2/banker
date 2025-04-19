import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseRepository } from "src/database/database.repository";
import { Users } from "src/database/entity/users.entity";
import { hash } from "crypto";
@Injectable()
export class UsersService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async createUser (user:Users) {
        const hashedPassword=hash("sha256",user.password,"hex");
        console.log(hashedPassword);
        user.password=hashedPassword;
        
        return await this.databaseRepository.createUser(user);
    }

    async deleteUser (user:Users) {
        return await this.databaseRepository.deleteUserById(user);
    }

    updateUser (user:Users) {
        return this.databaseRepository.updateUser(user);
    }

}