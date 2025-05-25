import { Injectable, Move, UnauthorizedException } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";
import { ListRequestDTO } from "src/database/dto/listRequestDTO";
import CreateMovementDTO from "src/database/dto/movements/createMovement.dto";
import { ListMovementsDTO } from "src/database/dto/movements/listMovementsDTO";
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

    async createMovement(movement: Movements) {
        movement.originAccount = await this.database.selectAccountByNumberAndUserId(movement.originAccount.number, movement.originAccount.user.id);
        movement.destinationAccount = await this.database.selectAccountByNumber(movement.destinationAccount.number);
        movement.date = new Date();

        const movementInserted = await this.database.createMovement(movement);
        movement.id = movementInserted.id;

        const movementWithAccountAndUser = await this.database.getOneMovementById(movement.id);

        const destinationUserId = movement.destinationAccount.user.id;
        await this.rabbitMq.channel.assertExchange(`exchange${destinationUserId}`, "fanout");
        await this.rabbitMq.channel.publish(`exchange${destinationUserId}`, "", Buffer.from(
            JSON.stringify(movementWithAccountAndUser)
            //`{origin_account_id':'${originAccount}','destination_account_id':'${destinationAccount}','money':'${money}'}`
        ))
    }

    async listMovements(listRequestDTO:ListRequestDTO<ListMovementsDTO>) : Promise<ListResponseDTO<Movements>> {
        const account=listRequestDTO.data.originAccount;
        const offset= listRequestDTO.page-1*25;
        if (listRequestDTO.data.dateEnd && listRequestDTO.data.dateStart) {
            //return await this.database.selectMovementsFromAccountIdAndUserIdByDateInterval(account.id,account.user.id,offset,listRequestDTO.data.dateStart,listRequestDTO.data.dateEnd);
        } else {
            return await this.database.selectMovementsFromAccountIdAndUserIdOffset(account.id, account.user.id, offset);
        }
        
    }

    async deleteMovement(movement: Movements) {
        //Check if origin Account is from the user
        movement = await this.database.selectMovementsFullAccountsUsersFromMovementId(movement);
        return await this.database.deleteMovementById(movement);
    }
}