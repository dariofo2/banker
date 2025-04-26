import { Injectable } from "@nestjs/common";
import * as celery from "celery-node";

@Injectable()
export class CeleryClientService {
    client= celery.createClient(
        process.env.RABBITMQ_HOST,
        process.env.RABBITMQ_HOST
    )
    
    async createTask () {
        const task=this.client.createTask("tasks.add");
        const result=task.applyAsync([1,2]);
        //console.log(result.taskId)
        const data=await result.get();

        console.log(data);
        //this.client.disconnect();
    }
}