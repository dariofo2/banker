import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./accounts.entity";
import { IsAlpha, IsEmail, MinLength } from "class-validator";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsAlpha()
    name: string;

    @Column()
    @MinLength(1)
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(type => Accounts, acc => acc.id)
    accounts: Accounts[];
}