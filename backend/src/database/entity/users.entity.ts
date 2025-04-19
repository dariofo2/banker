import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./accounts.entity";
import { IsAlpha, IsEmail } from "class-validator";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    
    @Column()
    @IsAlpha()
    name: string;

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(type => Accounts, acc => acc.id)
    accounts: Accounts[];
}