import { Module } from '@nestjs/common';
import { BlockchainAccountsService } from './blockchainAccounts.service';
import { BlockchainAccountsController } from './blockchainAccounts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MainAuthModule } from 'src/auth/mainauth.module';
import { Web3Module } from 'src/web3/web3.module';

@Module({
  imports:[DatabaseModule,MainAuthModule,Web3Module],
  controllers: [BlockchainAccountsController],
  providers: [BlockchainAccountsService],
})
export class BlockchainAccountsModule {}
