import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";
import { IsDate, IsNumber } from "class-validator";

@Entity()
export class Movements {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    money: number;

    @Column()
    @IsDate()
    date: Date;
    
    @ManyToOne(()=>Accounts,account=>account.id)
    originAccount: Accounts;

    @ManyToOne(()=>Accounts,account=>account.id)
    destinationAccount: Accounts;
}