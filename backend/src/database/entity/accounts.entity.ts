import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Movements } from "./movements.entity";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    balance: number;

    @ManyToOne(() => Users,(user)=>user.id)
    user: Users;

    @OneToMany(type=>Movements,mov=>mov.originAccount)
    originMovements: Movements[];

    @OneToMany(type=>Movements,mov=>mov.destinationAccount)
    destinationMovements: Movements[]
}