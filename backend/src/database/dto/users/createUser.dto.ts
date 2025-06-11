import { Exclude, Expose } from "class-transformer";
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from "class-validator";

@Exclude()
export class CreateUserDTO {
    @Expose()
    @IsAlpha()
    @IsNotEmpty()
    name:string;

    @Expose()
    @IsEmail()
    email:string;

    @Expose()
    @MinLength(5)
    password:string;
}