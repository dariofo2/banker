import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";

@Injectable()
export class MovementsService {
    constructor(
        private database: DatabaseRepository,
        private rabbitMq: RabbitMQ
    ) { }

    async createMovement(userid: number, originAccount: number, destinationAccount: number, money: number) {
        //Check if origin account is from the user
        let searchUserandAcc = await this.database.selectAccountById(userid, originAccount);
        
        if (searchUserandAcc != null && searchUserandAcc != undefined) {
            //Get the userDestinationId
            let userDestinationId = await this.database.selectUseridFromAccountId(destinationAccount);
            let isDone = await this.database.createMovement(userid, originAccount, destinationAccount, money, userDestinationId);
            
            //Send the Event to RabbitMQ exchange of Destination User Account
            if (isDone) {
                await this.rabbitMq.channel.assertExchange(`exchange${userDestinationId}`, "fanout");
                await this.rabbitMq.channel.publish(`exchange${userDestinationId}`, "", Buffer.from(
                    `{'origin_account_id':'${originAccount}','destination_account_id':'${destinationAccount}','money':'${money}'}`
                ))
                return true;
            } else return false;

        } else return false;

    }

    async listMovements(userid: number, originAccount: number) {
        //Check if origin account is from the User
        let searchUserandAcc = await this.database.selectAccountById(userid, originAccount);
        if (searchUserandAcc != null && searchUserandAcc != undefined) {
            //Get List of Movements of this Account
            return await this.database.selectMovementsFromAccountId(userid, originAccount);
        } else return false;

    }

    async deleteMovement(userid: number, originAccount: number, id: number, destinationAccount: number) {
        //Check if origin Account is from the user
        let searchUserandAcc = await this.database.selectAccountById(userid,originAccount);
        if (searchUserandAcc != null && searchUserandAcc != undefined) {
            //Try to Delete the Movement
            let userDestinationId = await this.database.selectUseridFromAccountId(destinationAccount);
            return await this.database.deleteMovementById(userid, originAccount, id, destinationAccount,userDestinationId);
        } else return false;
    }
}