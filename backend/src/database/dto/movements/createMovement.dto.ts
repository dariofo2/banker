export default class CreateMovementDTO {
    money: number;
    originAccount: {
        number: string,
    }
    destinationAccount: {
        number: string
    };
}