import { IsAlphanumeric, IsObject } from "class-validator";
import { SignTransactionResult } from "web3";

export class CreateBlockchainAccountDTO {
    @IsAlphanumeric()
    address: string;

    privatekey: string;

    @IsObject()
    signedTransaction: SignTransactionResult
}