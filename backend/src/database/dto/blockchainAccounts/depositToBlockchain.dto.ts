import { IsNumber, IsObject } from "class-validator";
import { SignTransactionResult } from "web3";

export class DepositToBlockChainDTO {
    @IsNumber()
    toBlockChainAccountAddress:string;

    @IsObject()
    fromNormalAccountId: number;

    @IsNumber()
    amount:number;
}