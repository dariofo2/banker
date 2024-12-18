import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class MovementsService {
    constructor (
        private database: DatabaseRepository
    ) {}

    async createMovement (userid: number, originAccount: number, destinationAccount: number, money: number) {
        return await this.database.createMovement(userid,originAccount,destinationAccount,money);
    }

    async listMovements (userid:number,accountId: number) {
        return await this.database.selectMovementsFromAccountId(userid,accountId);
    }
}