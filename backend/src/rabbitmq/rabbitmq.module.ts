import { Module } from "@nestjs/common";
import { RabbitMQ } from "./rabbitmq.service";

@Module({
    providers:[RabbitMQ],
    exports:[RabbitMQ]
})

export class RabbitMQModule {

}