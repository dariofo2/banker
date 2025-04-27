import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor("backend")
export class BullMQWorkerService extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case "generateAccountNumber": {
                let foundNumber=false;
                //console.log("holaa")
                for (let index = 0; index < 10000; index++) {
                    await console.log("b");
                    
                }
                return "hola";
            }
        }
    }
}