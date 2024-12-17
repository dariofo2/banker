import { Controller, Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MainAuthModule } from "src/auth/mainauth.module";

@Module({
    imports: [DatabaseModule,MainAuthModule],
    controllers:[UsersController],
    providers:[UsersService],
})

export class UsersModule {}