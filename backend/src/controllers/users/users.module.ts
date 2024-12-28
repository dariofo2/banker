import { Controller, Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MainAuthModule } from "src/auth/mainauth.module";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import EventEmitter from "events";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
    imports: [DatabaseModule,MainAuthModule,EventEmitterModule.forRoot()],
    controllers:[UsersController],
    providers:[UsersService,RabbitMQ],
})

export class UsersModule {}