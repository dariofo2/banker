import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class BullMQClientService {
    constructor (
        @InjectQueue("backend") private backendQueue: Queue
    ) {}

    async addJob () {
        await this.backendQueue.add(
            "generateAccountNumber",
            {
                foo:"bar"
            }
        )
    }
}