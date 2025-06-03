import { IsAlphanumeric, IsNumber } from "class-validator";

export default class CreateMovementDTO {
    
    money: number;

    @IsAlphanumeric()
    concept: string;
    
    originAccount: {
        number: string,
    }
    destinationAccount: {
        number: string
    };
}