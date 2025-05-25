import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";
import { IsDate, IsNumber } from "class-validator";

export class Movements {
    id?: number;

    @IsNumber()
    money?: number;

    @IsDate()
    date?: Date;
    
    originAccount?: Accounts;

    destinationAccount?: Accounts;
}