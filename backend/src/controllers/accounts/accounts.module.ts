import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [AccountsService],
    controllers: [AccountsController],
})

export class AccountsModule {}