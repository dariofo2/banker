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

    updateUser (user:Users) {
        return this.databaseRepository.updateUser(user);
    }

}