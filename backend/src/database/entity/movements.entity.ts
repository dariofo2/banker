import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Accounts } from "./accounts.entity";

@Entity()
export class Movements {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    money: number;

    @ManyToOne(()=>Accounts,account=>account.id)
    originAccount: Accounts;

    @ManyToOne(()=>Accounts,account=>account.id)
    destinationAccount: Accounts;
}