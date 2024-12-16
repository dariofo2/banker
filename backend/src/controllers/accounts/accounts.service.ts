import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class AccountsService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    createAccount () {

    }

    deleteAccount () {

    }

    updateAccount () {
        
    }
}