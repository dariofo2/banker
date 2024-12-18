import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class UsersService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async createUser (name:string,password:string,email:string) {
        try {
            await this.databaseRepository.createUser(name,password,email);
            return true;
        } catch {
            return false;
        }
    }

    async deleteUser (id:number) {
        return await this.databaseRepository.deleteUserById(id);
    }

    updateUser () {
        
    }

}