import { IsAlpha, IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsAlpha()
    name:string;

    @IsEmail()
    email:string;

    @MinLength(5)
    password:string;
}