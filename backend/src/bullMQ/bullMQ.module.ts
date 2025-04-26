import { Module } from "@nestjs/common";
import { BullMQClientService} from "./bullMQClient.service";
import { BullModule } from "@nestjs/bullmq";
import { BullMQWorkerService } from "./bullMQWorker.service";

@Module({
    imports: [
        BullModule.forRootAsync({
            useFactory: ()=>({
                connection: {
                    host: process.env.REDIS_HOST,
                    port: parseInt(process.env.REDIS_PORT),
                    password: process.env.REDIS_PASSWORD
                }
            })
        }),
        BullModule.registerQueue({
            name:"backend"
        })
    ],
    providers:[BullMQClientService,BullMQWorkerService],
    exports:[BullModule,BullMQClientService,BullMQWorkerService]
})
export class BullMQModule {}