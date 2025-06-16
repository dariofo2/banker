import { Users } from "./users.entity";
import { Movements } from "./movements.entity";
import { IsAlpha, IsAlphanumeric, IsEnum } from "class-validator";
import { accountType } from "../dto/enumAccountType";

export class Accounts {
    id?: number;

    @IsAlphanumeric()
    number?: string;

    type?: string;

    balance?: number;

    user?: Users;

    originMovements?: Movements[];

    destinationMovements?: Movements[]
}