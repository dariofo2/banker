import { IsEmpty, IsEnum } from "class-validator";
import { accountType } from "../enumAccountType";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdateAccountDTO {
    @Expose()
    id:number;

    @Expose()
    @IsEnum(accountType)
    type: string;
}