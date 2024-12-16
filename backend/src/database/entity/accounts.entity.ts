import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    balance: number;
}