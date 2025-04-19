import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthGuard } from "./mainauth.guard";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [DatabaseModule,JwtModule.register({
        global: true,
        secret: "topsecret",
        signOptions: {expiresIn: '50000s'},
    })],
    providers: [MainAuthGuard,AuthService],
    controllers: [AuthController],
    exports: [MainAuthGuard,JwtModule],
})

export class MainAuthModule {}