import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { AccountsService } from './accounts.service';
import { DatabaseRepository } from 'src/database/database.repository';
import { Accounts } from 'src/database/entity/accounts.entity';
import { accountType } from 'src/database/dto/enumAccountType';
import { Users } from 'src/database/entity/users.entity';
import { BullMQClientService } from 'src/bullMQ/bullMQClient.service';
import { BadRequestException } from '@nestjs/common';

describe('Accounts Service', () => {
  let accountsService: AccountsService;

  const mockDatabaseRepository = {
    createAccount: jest.fn(),
    deleteAccountById: jest.fn(),
    updateAccount: jest.fn(),
    listAccount: jest.fn(),
    selectAccountsByUserId: jest.fn(),
    listAdminAccountsByUser: jest.fn(),
    selectAccountByIdAndUserId: jest.fn()
  }

  const mockBullMQClient = {
    addJobGenerateAccountNumber: jest.fn()
  }

  const user:Users= {
    id:1,
    name:"hola",
    password:"password",
    email:"hola@hola",
    role:1,
    photo:"",
    accounts:[]
  }

  const account:Accounts = {
    id:1,
    number:"hola",
    type:accountType.corriente,
    balance:500,
    user: user,
    originMovements:[],
    destinationMovements:[],

  } 

  const accountBlocked:Accounts = {
    id:1,
    number:"hola",
    type:"blocked",
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
        },
        {
          provide: BullMQClientService,
          useValue: mockBullMQClient
        }
      ]
    }).compile();

    accountsService = app.get(AccountsService);
  });

  describe('Create Account', () => {
    it('should Create Account', async () => {
      jest.spyOn(mockBullMQClient,"addJobGenerateAccountNumber").mockReturnValue("ES9056785945784930303");
      jest.spyOn(mockDatabaseRepository,"createAccount").mockReturnValue(account);

      const result=await accountsService.createAccount(account);

      expect(result).toBe(account);
    });
  });

  describe('Delete Account', () => {
    it('should Delete Account', async () => {
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockReturnValue(account);
      jest.spyOn(mockDatabaseRepository,"deleteAccountById").mockReturnValue(account)

      const result=await accountsService.deleteAccount(account);
      
      expect(result).toBe(account);
    });
  });

  describe('Update Account', () => {
    it('should Update Account', async () => {
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockReturnValue(account);
      jest.spyOn(mockDatabaseRepository,"updateAccount").mockReturnValue(account);

      const result=await accountsService.updateAccount(account);

      expect(result).toBe(account);
    });
    
    it('should Throw Bad Request on Blocked Account', async () => {
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockReturnValue(accountBlocked);
      jest.spyOn(mockDatabaseRepository,"updateAccount").mockReturnValue(account);
      try {
      await accountsService.updateAccount({...account,type:"blocked"});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    
  });

  describe('List Account User', () => {
    it('should List an Account of user', async () => {
      jest.spyOn(mockDatabaseRepository,"selectAccountByIdAndUserId").mockReturnValue(account);

      const result=await accountsService.listAccount(account);

      expect(result).toBe(account);
    });
  });

  describe('List Accounts User', () => {
    it('should List Accounts of user', async () => {
      jest.spyOn(mockDatabaseRepository,"selectAccountsByUserId").mockReturnValue(account);

      const result=await accountsService.listAccounts(1);

      expect(result).toBe(account);
    });
  });

  describe('Admin List Accounts', () => {
    it('should Admin List All Accounts', async () => {
      jest.spyOn(mockDatabaseRepository,"listAdminAccountsByUser").mockReturnValue(account);
      const result=await accountsService.adminList({
        orderName: "hola",
        orderDirection:"ASC", 
        searchValue:"hola",
        limit:0,
        offset: 10,
        draw: 0,
        data: {}
    });

      expect(result).toBe(account);
    });
  });

  describe('Admin Update Account', () => {
    it('should List Accounts of user', async () => {
      jest.spyOn(mockDatabaseRepository,"updateAccount").mockReturnValue(account);

      const result=await accountsService.adminUpdate(account);

      expect(result).toBe(account);
    });
  });
});
