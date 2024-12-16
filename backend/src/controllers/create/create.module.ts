import { Module } from "@nestjs/common";
import { CreateService } from "./create.service";
import { CreateController } from "./create.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    controllers:[CreateController],
    providers:[CreateService]
})

export class InsertModule {}