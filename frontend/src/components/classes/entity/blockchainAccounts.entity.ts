import { Users } from "./users.entity";
import { IsAlphanumeric } from "class-validator";

export class BlockchainAccounts {
    id?:number

    @IsAlphanumeric()
    address?:string

    privatekey?:string

    user?:Users
}