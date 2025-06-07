import { IsAlphanumeric, IsNumber, IsObject } from "class-validator";
import { SignTransactionResult } from "web3";

export class DepositToBlockChainDTO {
    @IsAlphanumeric()
    toBlockChainAccountAddress:string;

    @IsNumber()
    fromNormalAccountId: number;

    @IsNumber()
    amount:number;
}