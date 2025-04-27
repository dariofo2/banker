import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { AccountsService } from './accounts.service';
import { DatabaseRepository } from 'src/database/database.repository';
import { Accounts } from 'src/database/entity/accounts.entity';
import { accountType } from 'src/database/dto/enumAccountType';
import { Users } from 'src/database/entity/users.entity';

describe('Accounts Service', () => {
  let accountsService: AccountsService;

  const mockDatabaseRepository = {
    createAccount: jest.fn,
    deleteAccountById: jest.fn(),
    listAccount: jest.fn(),
    listAccounts: jest.fn()
  }

  const user:Users= {
    id:1,
    name:"hola",
    password:"password",
    email:"hola@hola",
    accounts:[]
  }
  const account:Accounts= {
    id:1,
    number:"hola",
    type:accountType.corriente,
    balance:500,
    user: user,
    originMovements:[],
    destinationMovements:[],

  } 
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide:DatabaseRepository,
          useValue:mockDatabaseRepository
        }
      ]
    }).compile();

    accountsService = app.get(AccountsService);
  });

  describe('Create Account', () => {
    it('should Create Account', async () => {
      const result=await accountsService.createAccount(account);

      expect(result).toBe('Hello World!');
    });
  });
});
