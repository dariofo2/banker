import { Module } from '@nestjs/common';
import { BlockchainAccountsService } from './blockchainAccounts.service';
import { BlockchainAccountsController } from './blockchainAccounts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MainAuthModule } from 'src/auth/mainauth.module';

@Module({
  imports:[DatabaseModule,MainAuthModule],
  controllers: [BlockchainAccountsController],
  providers: [BlockchainAccountsService],
})
export class BlockchainAccountsModule {}
