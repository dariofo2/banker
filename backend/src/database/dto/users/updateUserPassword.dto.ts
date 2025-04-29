import { IsEmpty, MinLength } from "class-validator";

export class UpdateUserPasswordDTO {
    @IsEmpty()
    name: string;

    @IsEmpty()
    email: string;

    @MinLength(5)
    password: string;
}