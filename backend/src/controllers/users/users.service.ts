import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class UsersService {
    constructor (private databaseRepository: DatabaseRepository) {}

    createUser () {
        this.databaseRepository.createUser('dari','abc123.','hola@hola');
    }

    loginUser () {

    }

    deleteUser () {

    }

    updateUser () {
         
    }
}