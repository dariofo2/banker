import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { Movements } from "src/database/entity/movements.entity";
import { Users } from "src/database/entity/users.entity";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import { json } from "stream/consumers";

@Injectable()
export class MovementsService {
    constructor(
        private database: DatabaseRepository,
        private rabbitMq: RabbitMQ
    ) { }

    async createMovement(userid:number, originAccount: number, destinationAccount: number, money: number) {
        //Check if origin account is from the user
        let searchUserandAcc = await this.database.selectAccountById(userid, originAccount);
        
        if (searchUserandAcc != null && searchUserandAcc != undefined) {
            //Get the userDestinationId for use in RabbitMQ
            let userDestination: Users = await this.database.selectUserFromAccountId(destinationAccount);
            
            //Create Movement and GET ID of Movement
            let movement = await this.database.createMovement(userid, originAccount, destinationAccount, money, userDestination.id);
            
            
            if (movement!=undefined) {
                //Get The Movement
                movement=await this.database.get1Movement(movement.id);

                //Send the Event to RabbitMQ exchange of Destination User Account
                await this.rabbitMq.channel.assertExchange(`exchange${userDestination.id}`, "fanout");
                await this.rabbitMq.channel.publish(`exchange${userDestination.id}`, "", Buffer.from(
                    JSON.stringify(movement)
                    //`{origin_account_id':'${originAccount}','destination_account_id':'${destinationAccount}','money':'${money}'}`
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
            let userDestination = await this.database.selectUserFromAccountId(destinationAccount);
            return await this.database.deleteMovementById(userid, originAccount, id, destinationAccount,userDestination.id);
        } else return false;
        
        
    }
}