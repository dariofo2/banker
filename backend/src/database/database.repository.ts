import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Repository } from "typeorm";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";

@Injectable()
export class DatabaseRepository {
    constructor (
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Accounts)
        private accountsRepository: Repository<Accounts>,
        @InjectRepository(Movements)
        private movementsRepository: Repository<Movements>,
    ) {}

    /**
     * INSERT/CREATE QUERIES
     * @returns string
     */

     async createUser() {
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

    async createMovement() {
        return this.movementsRepository.insert({
            origin_account_id: 2,
            destination_account_id: 2,
            money: 200
        })
    }


    /**
     * LIST and SELECT Queries
     * @returns string
     */

    async login(username: string, password: string) : Promise<Users> {
        let findObject=await this.usersRepository.findOneBy({
            name: username,
            password: password
        });
        
        return findObject;
    }
}