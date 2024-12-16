import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movements {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    origin_account_id: number;

    @Column()
    destination_account_id: number;

    @Column()
    money: number;
}