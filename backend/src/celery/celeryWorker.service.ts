import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as celery from "celery-node";

@Injectable()
export class CeleryWorkerService implements OnApplicationBootstrap {
    worker= celery.createWorker(
        process.env.RABBITMQ_HOST,
        process.env.RABBITMQ_HOST
    )

    async registerAdd () {
        
        await this.worker.register("tasks.add", (a,b) => {
            console.log(a+b);
            return a+b;
        });
        
        
    }

    onApplicationBootstrap() {
        this.registerAdd();
        this.worker.start()
    }
}