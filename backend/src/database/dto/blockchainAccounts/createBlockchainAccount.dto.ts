import { IsAlphanumeric } from "class-validator";

export class CreateBlockchainAccountDTO {
    @IsAlphanumeric()
    address: string;

    
    privatekey: string;
}