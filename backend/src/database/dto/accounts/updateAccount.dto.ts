import { IsEmpty, IsEnum } from "class-validator";
import { accountType } from "../enumAccountType";

export class UpdateAccountDTO {
    id:number;

    @IsEnum(accountType)
    type: string;

    @IsEmpty()
    balance: number;
}