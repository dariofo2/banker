import { IsAlpha, IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEmpty()
    password: string;
}