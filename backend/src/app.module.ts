import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { InsertModule } from './controllers/create/create.module';

@Module({
  imports: [
    DatabaseModule,
    InsertModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
