import { Body, Injectable } from '@nestjs/common';
import { DatabaseRepository } from 'src/database/database.repository';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import { Users } from 'src/database/entity/users.entity';

@Injectable()
export class BlockchainAccountsService {
  constructor (
    private readonly databaseRepository: DatabaseRepository,
  ) {}


  async create(blockchainAccount:BlockchainAccounts) {
    return await this.databaseRepository.createBlockchainAccount(blockchainAccount);
  }

  async findAll(user:Users) {
    return await this.databaseRepository.selectBlockChainAccountsByUserId(user);
  }

  async findOne(blockchainAccount:BlockchainAccounts) {
    return await this.databaseRepository.selectBlockChainAccountById(blockchainAccount);
  }

  async update(blockchainAccount: BlockchainAccounts) {
    return await this.databaseRepository.updateBlockChainAccount(blockchainAccount);
  }

  async remove(@Body() blockchainAccount:BlockchainAccounts) {
    await this.databaseRepository.deleteBlockchainAccountById(blockchainAccount);
    return "Delete Done";
  }
}
