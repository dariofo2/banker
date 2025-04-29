import { Injectable, Move, UnauthorizedException } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import CreateMovementDTO from "src/database/dto/movements/createMovement.dto";
import { ListMovementsDTO } from "src/database/dto/movements/listMovements.dto";
import { Accounts } from "src/database/entity/accounts.entity";
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

    async createMovement(movement:Movements) {
        //Check if origin account is from the user
        /*
        let searchUserandAcc = await this.database.selectAccountById(movement.originAccount);

        if (searchUserandAcc != null && searchUserandAcc != undefined) {
            //Get the userDestinationId for use in RabbitMQ
            let userDestination: Users = await this.database.selectUserFromAccountId(movement.destinationAccount);
            movement.destinationAccount.user = userDestination;

            //Create Movement and GET ID of Movement for use in RabbitMQ
            let movementInserted = await this.database.createMovement(movement);


            if (movementInserted != undefined) {
                //Get The Movement
                movement = await this.database.get1Movement(movementInserted);

                //Send the Event to RabbitMQ exchange of Destination User Account
                await this.rabbitMq.channel.assertExchange(`exchange${userDestination.id}`, "fanout");
                await this.rabbitMq.channel.publish(`exchange${userDestination.id}`, "", Buffer.from(
                    JSON.stringify(movement)
                    //`{origin_account_id':'${originAccount}','destination_account_id':'${destinationAccount}','money':'${money}'}`
                ))
                return true;

            } else throw "Error on Create Movement";

        } else throw "Error on Create Movement. Cant Validate User Session with Account";

        */
        
        movement.originAccount = await this.database.selectAccountByNumberAndUserId(movement.originAccount.number, movement.originAccount.user.id);
        movement.destinationAccount = await this.database.selectAccountByNumber(movement.destinationAccount.number);

        const movementInserted = await this.database.createMovement(movement);
        movement.id=movementInserted.id;
        
        const movementWithAccountAndUser= await this.database.getOneMovementById(movement.id);
        
        const destinationUserId= movement.destinationAccount.user.id;
        await this.rabbitMq.channel.assertExchange(`exchange${destinationUserId}`, "fanout");
        await this.rabbitMq.channel.publish(`exchange${destinationUserId}`, "", Buffer.from(
            JSON.stringify(movementWithAccountAndUser)
            //`{origin_account_id':'${originAccount}','destination_account_id':'${destinationAccount}','money':'${money}'}`
        ))
    }

    async listMovements(listMovementDTO:ListMovementsDTO,user:Users) {
        return await this.database.selectMovementsFromAccountIdAndUserIdOffset(listMovementDTO.account.id,user.id,listMovementDTO.offset);
    }

    async deleteMovement(movement: Movements) {
        //Check if origin Account is from the user
        movement = await this.database.selectMovementsFullAccountsUsersFromMovementId(movement);
        return await this.database.deleteMovementById(movement);
    }
}