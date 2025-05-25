import { Accounts } from "src/database/entity/accounts.entity";
import { Users } from "src/database/entity/users.entity";

export class ListMovementsDTO {
    originAccount: {
        id: number,
        user: Users
    }
    dateStart: Date;
    dateEnd: Date;
}