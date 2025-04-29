import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class UpdateBlockchainAccountDTO {
    id: number;
    
    @IsAlphanumeric()
    @IsNotEmpty()
    address: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    privatekey: string;
}