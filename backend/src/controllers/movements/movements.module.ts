import { Module } from "@nestjs/common";
import { MovementsController } from "./movements.controller";
import { MovementsService } from "./movements.service";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthModule } from "src/auth/mainauth.module";

@Module({
    imports:[DatabaseModule,MainAuthModule],
    providers:[MovementsService],
    controllers:[MovementsController]
})

export class MovementsModule {}