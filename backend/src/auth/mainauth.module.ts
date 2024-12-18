import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthGuard } from "./mainauth.guard";
import { AuthLoginController } from "./authlogin.controller";
import { AuthLoginService } from "./authlogin.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [DatabaseModule,JwtModule.register({
        global: true,
        secret: "topsecret",
        signOptions: {expiresIn: '50000s'},
    })],
    providers: [MainAuthGuard,AuthLoginService],
    controllers: [AuthLoginController],
    exports: [MainAuthGuard],
})

export class MainAuthModule {}