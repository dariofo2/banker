import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainAccountsController } from './blockchainAccounts.controller';
import { BlockchainAccountsService } from './blockchainAccounts.service';

describe('BlockchainAccountsController', () => {
  let controller: BlockchainAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockchainAccountsController],
      providers: [BlockchainAccountsService],
    }).compile();

    controller = module.get<BlockchainAccountsController>(BlockchainAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
