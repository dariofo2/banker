import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accounts } from "./accounts.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(type => Accounts, acc => acc.id)
    accounts: Accounts[];
}