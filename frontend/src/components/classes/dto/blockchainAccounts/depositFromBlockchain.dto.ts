import { IsNumber, IsObject } from "class-validator";
import { SignTransactionResult } from "web3";

export class DepositFromBlockChainDTO {
    @IsNumber()
    toAccountId?:number;

    @IsObject()
    signedTransaction?: SignTransactionResult
}