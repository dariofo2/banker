import { Module } from "@nestjs/common";
import { MovementsController } from "./movements.controller";
import { MovementsService } from "./movements.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    providers:[MovementsService],
    controllers:[MovementsController]
})

export class MovementsModule {}