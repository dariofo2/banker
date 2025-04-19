import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Movements } from "./movements.entity";
import { IsAlpha, IsEnum } from "class-validator";
import { accountType } from "../dto/enumAccountType";

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsAlpha()
    name: string;

    @Column()
    @IsEnum(accountType)
    type: accountType;

    @Column()
    balance: number;

    @ManyToOne(() => Users,(user)=>user.id)
    user: Users;

    @OneToMany(type=>Movements,mov=>mov.originAccount)
    originMovements: Movements[];

    @OneToMany(type=>Movements,mov=>mov.destinationAccount)
    destinationMovements: Movements[]
}