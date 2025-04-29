import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { IsAlphanumeric } from "class-validator";

@Entity()
export class BlockchainAccounts {
    @PrimaryGeneratedColumn()
    id:number

    @IsAlphanumeric()
    @Column()
    address:string

    @Column()
    privatekey:string

    @ManyToOne(()=>Users,user=>user.id)
    user:Users
}