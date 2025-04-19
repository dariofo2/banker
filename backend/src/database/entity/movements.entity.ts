import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";
import { IsNumber } from "class-validator";

@Entity()
export class Movements {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    money: number;

    @ManyToOne(()=>Accounts,account=>account.id)
    originAccount: Accounts;

    @ManyToOne(()=>Accounts,account=>account.id)
    destinationAccount: Accounts;
}