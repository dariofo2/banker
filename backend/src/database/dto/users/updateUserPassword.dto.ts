import { Exclude, Expose } from "class-transformer";
import { IsEmpty, MinLength } from "class-validator";

@Exclude()
export class UpdateUserPasswordDTO {
    @Expose()
    @MinLength(5)
    password: string;
}