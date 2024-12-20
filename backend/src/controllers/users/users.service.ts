import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class UsersService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async createUser (name:string,password:string,email:string) {
        return await this.databaseRepository.createUser(name,password,email);
    }

    async deleteUser (id:number) {
        return await this.databaseRepository.deleteUserById(id);
    }

    updateUser (req) {
        return this.databaseRepository.updateUser(req.user.id,req.body.name,req.body.password,req.body.email);
    }

}