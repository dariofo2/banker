import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './controllers/users/users.module';
import { MovementsModule } from './controllers/movements/movements.module';
import { AccountsModule } from './controllers/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';
import { WebSocketModule } from './websockets/websockets.module';
import { ConfigModule } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    UsersModule,
    MovementsModule,
    AccountsModule,
    WebSocketModule,
    CryptoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
