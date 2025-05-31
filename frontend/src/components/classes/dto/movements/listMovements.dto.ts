import { Users } from "../../entity/users.entity";

export class ListMovementsDTO {
    originAccount: {
        id: number,
        user: Users
    }
    dateStart?: Date;
    dateEnd?: Date;

    constructor(accountId:number,dateStart?:Date,dateEnd?: Date) {
        this.originAccount={
            id:accountId,
            user:{}
        };
        this.dateStart=dateStart;
        this.dateEnd=dateEnd;
    }
}