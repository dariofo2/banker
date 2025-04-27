import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job, Queue, QueueEvents } from "bullmq";

@Injectable()
export class BullMQClientService {
    constructor (
        @InjectQueue("backend") private backendQueue: Queue
    ) {}
    /*
    queue= new Queue("backend",{
        connection: {
            host:process.env.REDIS_HOST,
            port:parseInt(process.env.REDIS_PORT),
            password:process.env.REDIS_PASSWORD
        }
    });
    */
    queueEvents:QueueEvents = new QueueEvents("backend",{
        connection: {
            host:process.env.REDIS_HOST,
            port:parseInt(process.env.REDIS_PORT),
            password:process.env.REDIS_PASSWORD
        }
    });
    
    async addJobGenerateAccountNumber () : Promise<string>{
        const job=await this.backendQueue.add(
            "generateAccountNumber",
            {
                foo:"bar"
            }
        )
        const result=await job.waitUntilFinished(this.queueEvents);
        return result as string;
    }
}