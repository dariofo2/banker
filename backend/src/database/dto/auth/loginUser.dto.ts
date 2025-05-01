import { IsEmail } from "class-validator";

export class UserLoginDTO {
    @IsEmail()
    email:string;

    password:string;
}