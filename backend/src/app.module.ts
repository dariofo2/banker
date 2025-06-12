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
import { BullMQModule } from './bullMQ/bullMQ.module';
import { CeleryModule } from './celery/celery.module';
import { BlockchainAccountsModule } from './controllers/blockchainAccounts/blockchainAccounts.module';
import { Web3Module } from './web3/web3.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`
    }),
    DatabaseModule,
    UsersModule,
    MovementsModule,
    AccountsModule,
    BlockchainAccountsModule,
    WebSocketModule,
    CryptoModule,
    BullMQModule,
    Web3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
