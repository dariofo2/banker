import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class MovementsService {
    constructor (
        private database: DatabaseRepository
    ) {}

    createMovement (originAccount: number, destinationAccount: number, money: number) {
        this.database.createMovement(originAccount,destinationAccount,money);
    }

    listMovements (accountId: number) {
        return this.database.selectMovementsFromAccountId(accountId);
    }
}