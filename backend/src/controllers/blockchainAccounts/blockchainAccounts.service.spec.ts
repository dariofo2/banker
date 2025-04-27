import { Test, TestingModule } from '@nestjs/testing';
import { BlockchainAccountsService } from './blockchainAccounts.service';

describe('BlockchainAccountsService', () => {
  let service: BlockchainAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockchainAccountsService],
    }).compile();

    service = module.get<BlockchainAccountsService>(BlockchainAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
