import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./accounts.entity";
import { IsAlpha, IsEmail, IsString, MinLength } from "class-validator";
import { Exclude } from "class-transformer";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsAlpha()
    name: string;

    @Column()
    @MinLength(1)
    @Exclude({toPlainOnly:true})
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    photo: string;

    @OneToMany(type => Accounts, acc => acc.id)
    accounts: Accounts[];
}