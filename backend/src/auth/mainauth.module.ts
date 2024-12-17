import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthGuard } from "./mainauth.guard";

@Module({
    imports: [DatabaseModule],
    providers: [MainAuthGuard],
    exports: [MainAuthGuard],
})

export class MainAuthModule {}