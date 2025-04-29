import { IsAlphanumeric, IsEnum } from "class-validator";
import { accountType } from "../enumAccountType";

export class CreateAccountDTO {
    @IsEnum(accountType)
    type: accountType;
}