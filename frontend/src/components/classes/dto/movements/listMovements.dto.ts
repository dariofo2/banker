import { Users } from "../../entity/users.entity";

export class ListMovementsDTO {
    originAccount: {
        id: number,
        user: Users
    }
    dateStart?: number;
    dateEnd?: number;

    constructor(accountId:number,dateStart?:number,dateEnd?: number) {
        this.originAccount={
            id:accountId,
            user:{}
        };
        this.dateStart=dateStart;
        this.dateEnd=dateEnd;
    }
}