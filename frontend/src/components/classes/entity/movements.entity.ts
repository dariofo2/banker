import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";
import { IsDate, IsNumber, IsString } from "class-validator";

export class Movements {
    id?: number;

    @IsString()
    type?: string;

    @IsString()
    concept?: string;

    @IsNumber()
    money?: number;

    @IsNumber()
    date?: number;
    
    originAccount?: Accounts;

    destinationAccount?: Accounts;
}