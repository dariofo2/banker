import { Accounts } from "./accounts.entity";
import { IsAlpha, IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { Exclude } from "class-transformer";

export class Users {
    id?: number;

    @IsAlpha()
    name?: string;

    @MinLength(1)
    @Exclude({toPlainOnly:true})
    password?: string;

    @IsEmail()
    email?: string;

    @IsString()
    photo?: string;

    @IsNumber()
    role?: number;

    accounts?: Accounts[];
}