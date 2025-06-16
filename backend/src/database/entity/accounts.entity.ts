import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Movements } from "./movements.entity";
import { IsAlpha, IsAlphanumeric, IsEnum } from "class-validator";
import { accountType } from "../dto/enumAccountType";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsAlphanumeric()
    number: string;

    @Column()
    type: string;

    @Column("decimal")
    balance: number;

    @ManyToOne(() => Users,(user)=>user.id)
    user: Users;

    @OneToMany(type=>Movements,mov=>mov.originAccount)
    originMovements: Movements[];

    @OneToMany(type=>Movements,mov=>mov.destinationAccount)
    destinationMovements: Movements[]
}