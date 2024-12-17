import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from "./accounts.controller";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthModule } from "src/auth/mainauth.module";

@Module({
    imports: [DatabaseModule,MainAuthModule],
    providers: [AccountsService],
    controllers: [AccountsController],
})

export class AccountsModule {}