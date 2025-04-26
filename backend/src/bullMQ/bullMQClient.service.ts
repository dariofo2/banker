import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue, QueueEvents } from "bullmq";

@Injectable()
export class BullMQClientService {
    constructor (
        @InjectQueue("backend") private backendQueue: Queue
    ) {}

    async addJob () {
        const queue="backend";
        const queueEvent=new QueueEvents("backend")
        const job=await this.backendQueue.add(
            "generateAccountNumber",
            {
                foo:"bar"
            }
        )

        //this.backendQueue.
        const promiseQueue= new Promise((resolve,reject)=>{
            queueEvent.on("completed", async (jobb) => {
                
                if (job.id==jobb.jobId) {

                    resolve(jobb.returnvalue);
                }
            })
        })

        console.log(await promiseQueue);
        
        
    }
}