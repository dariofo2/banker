import { IsAlphanumeric } from "class-validator";

export class CreateBlockchainAccountDTO {
    @IsAlphanumeric()
    address: string;

    @IsAlphanumeric()
    privatekey: string;
}