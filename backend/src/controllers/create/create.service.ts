import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DatabaseRepository } from "src/database/database.repository";
import { Accounts } from "src/database/entity/accounts.entity";
import { Movements } from "src/database/entity/movements.entity";
import { Users } from "src/database/entity/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateService {
    constructor (
        private databaseRepository : DatabaseRepository
    ) {}
    createUser() {
        this.databaseRepository.createUser();
    }

    createAccount() {
        this.databaseRepository.createAccount();
    }

    createMovement() {
       this.databaseRepository.createMovement();
    }

    async checkLogin() {
        let login=await this.databaseRepository.login("dario","abc123.");
        return login;
    }

}