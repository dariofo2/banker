import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor("backend")
export class BullMQWorkerService extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {
        switch (job.name) {
            case "generateAccountNumber": {
                let foundNumber=false;
                let accountNumber="";
                
                accountNumber+=process.env.ACCOUNT_NUMBER_START;
                accountNumber+=process.env.ACCOUNT_NUMBER_BANK;
                accountNumber+=process.env.ACCOUNT_NUMBER_OFFICE;
                
                //accountNumber.slice(2)
                for (let i = 0; i < 12; i++) {
                    let lastNumber:number=Math.floor(Math.random()*10);
                    accountNumber+=lastNumber;
                }
                
                return accountNumber;
            }
        }
    }
}