import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor("backend")
export class BullMQWorkerService extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case "generateAccountNumber": {
                let foundNumber=false;
                
                return "hola";
            }
        }
    }
}