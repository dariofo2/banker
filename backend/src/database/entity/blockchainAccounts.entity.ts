import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class blockchainAccounts {
    @PrimaryGeneratedColumn()
    address:string

    @Column()
    name:string

    @Column()
    privatekey:string

    @ManyToOne(()=>Users,user=>user.id)
    user:Users
}