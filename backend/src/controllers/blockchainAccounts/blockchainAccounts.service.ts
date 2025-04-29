import { Body, Injectable } from '@nestjs/common';
import { DatabaseRepository } from 'src/database/database.repository';
import { CreateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/createBlockchainAccount.dto';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import { Users } from 'src/database/entity/users.entity';

@Injectable()
export class BlockchainAccountsService {
  constructor (
    private readonly databaseRepository: DatabaseRepository,
  ) {}


  async create(blockChainAccount:BlockchainAccounts) {
    return await this.databaseRepository.createBlockchainAccount(blockChainAccount);
  }

  async findAll(user:Users) {
    return await this.databaseRepository.selectBlockChainAccountsByUserId(user.id);
  }

  async findOne(blockchainAccount:BlockchainAccounts) {
    return await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id,blockchainAccount.user.id);
  }

  async update(blockchainAccount: BlockchainAccounts) {
    await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id,blockchainAccount.user.id);
    return await this.databaseRepository.updateBlockChainAccount(blockchainAccount);
  }

  async remove(@Body() blockchainAccount:BlockchainAccounts) {
    await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id,blockchainAccount.user.id);
    await this.databaseRepository.deleteBlockchainAccountById(blockchainAccount);
    return "Delete Done";
  }
}
