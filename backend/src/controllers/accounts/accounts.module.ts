import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthModule } from "src/auth/mainauth.module";
import { BullMQModule } from "src/bullMQ/bullMQ.module";

@Module({
    imports: [DatabaseModule,MainAuthModule,BullMQModule],
    providers: [AccountsService],
    controllers: [AccountsController],
})

export class AccountsModule {}