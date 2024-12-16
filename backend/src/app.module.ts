import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './controllers/users/users.module';
import { MovementsModule } from './controllers/movements/movements.module';
import { AccountsModule } from './controllers/accounts/accounts.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    MovementsModule,
    AccountsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
