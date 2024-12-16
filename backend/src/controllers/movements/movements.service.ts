import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class MovementsService {
    constructor (
        private database: DatabaseRepository
    ) {}

    createMovement () {
        
    }
}