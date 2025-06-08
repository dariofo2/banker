import { IsAlphanumeric, IsObject } from "class-validator";
import { SignTransactionResult, Transaction } from "web3";


export class CreateBlockchainAccountDTO {
    @IsAlphanumeric()
    address?: string;

    @IsAlphanumeric()
    privatekey?: string;

    @IsObject()
    signedTransaction?: SignTransactionResult
}