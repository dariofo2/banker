import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class UsersService {
    constructor (private databaseRepository: DatabaseRepository) {}

    createUser (name:string,password:string,email:string) {
        this.databaseRepository.createUser(name,password,email);
    }

    deleteUser (id:number) {
        this.databaseRepository.deleteUserById(id);
    }

    updateUser () {
         
    }

    async login (username:string,password:string) {
        let user=await this.databaseRepository.login(username,password);
        if (user!=null) return user;
        else return false;
    }
}