import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { MainAuthGuard } from "./mainauth.guard";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AdminAuthGuard } from "./authRoles/adminAuth.guard";

@Module({
    imports: [DatabaseModule, JwtModule.registerAsync({
        useFactory: () => ({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        })
    })],
    providers: [MainAuthGuard, AuthService,AdminAuthGuard],
    controllers: [AuthController],
    exports: [MainAuthGuard, JwtModule],
})

export class MainAuthModule { }