import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Accounts } from "src/database/entity/accounts.entity";
import { Movements } from "src/database/entity/movements.entity";
import { Users } from "src/database/entity/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateService {
    constructor (
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        @InjectRepository(Movements)
        private movementsRepository: Repository<Movements>
    ) {}
    createUser() {
        return this.usersRepository.insert({
           name: 'dario',
           password: 'abc123.',
           email: 'dario@hola.com' 
        })
    }

    async createAccount() {
        await this.accountsRepository.insert({
            userid: 1,
            name: "Cuenta Corriente",
            type: "Normal",
            balance: 500
        });
    }

    createMovement() {
        return this.movementsRepository.insert({
            origin_account_id: 1,
            destination_account_id: 1,
            money: 200
        })
    }

}