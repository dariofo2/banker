import { Exclude, Expose } from "class-transformer";
import { IsAlpha, IsEmail, IsEmpty, IsNotEmpty } from "class-validator";
@Exclude()
export class UpdateUserDto {
    @Expose()
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsEmail()
    email: string;
}