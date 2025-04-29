import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsAlpha()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @MinLength(5)
    password:string;
}