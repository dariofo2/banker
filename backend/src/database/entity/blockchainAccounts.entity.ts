import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class BlockchainAccounts {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    address:string

    @Column()
    privatekey:string

    @ManyToOne(()=>Users,user=>user.id)
    user:Users
}