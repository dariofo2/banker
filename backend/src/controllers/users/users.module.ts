import { Controller, Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [DatabaseModule],
    controllers:[UsersController],
    providers:[UsersService],
})

export class UsersModule {}