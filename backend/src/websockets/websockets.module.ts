import { Module } from "@nestjs/common";
import { WebsocketsGateway } from "./websockets.gateway";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import { MainAuthModule } from "src/auth/mainauth.module";
import { DatabaseModule } from "src/database/database.module";
import { RabbitMQModule } from "src/rabbitmq/rabbitmq.module";

@Module({
    imports:[DatabaseModule,MainAuthModule,RabbitMQModule],
    providers:[WebsocketsGateway],
})
export class WebSocketModule {}