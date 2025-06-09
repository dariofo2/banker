import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";
import { IsAlphanumeric, IsDate, IsNumber } from "class-validator";

@Entity()
export class Movements {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column()
    @IsAlphanumeric()
    type: string;

    @Column()
    @IsAlphanumeric()
    concept: string;

    @Column("decimal")
    @IsNumber()
    money: number;

    @Column()
    @IsNumber()
    date: number;
    
    @ManyToOne(()=>Accounts,account=>account.id)
    originAccount: Accounts;

    @ManyToOne(()=>Accounts,account=>account.id)
    destinationAccount: Accounts;
}