import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { MovementsService } from './movements.service';
import { DatabaseRepository } from 'src/database/database.repository';
import { RabbitMQ } from 'src/rabbitmq/rabbitmq.service';
import { Movements } from 'src/database/entity/movements.entity';
import { Accounts } from 'src/database/entity/accounts.entity';
import { accountType } from 'src/database/dto/enumAccountType';
import { Users } from 'src/database/entity/users.entity';

describe('Movements Service', () => {
  let movementsService:MovementsService;
  
  const mockDatabaseRepository = {
    selectAccountById: jest.fn(),
    selectUserFromAccountId: jest.fn(),
    createMovement: jest.fn(),
    get1Movement: jest.fn(),
    selectMovementsFromAccountId: jest.fn(),
    deleteMovementById: jest.fn(),
    selectMovementsFullAccountsUsersFromMovementId: jest.fn()
  }

  const mockRabbitMQ = {
    channel: {
      assertExchange: jest.fn(),
      publish: jest.fn()
    }
  }
  
  const user: Users = {
      id:1,
      name:"hola",
      password:"password",
      email:"hola@hola.es",
      accounts:[]
  }
  const account : Accounts = {
    id:1,
    name:"Cuenta",
    type:accountType.corriente,
    balance: 500,
    user:user,
    originMovements:[],
    destinationMovements:[]
  }
  const movement : Movements = {
    id:1,
    originAccount:account,
    destinationAccount:account,
    money:500
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [MovementsService,
        {
          provide:DatabaseRepository,
          useValue:mockDatabaseRepository
        },
        {
          provide:RabbitMQ,
          useValue:mockRabbitMQ
        }
      ],
    }).compile();

    movementsService = app.get(MovementsService);
  });

  describe('Create Movement', () => {
    it('Should Create a Movement', async () => {
      jest.spyOn(mockDatabaseRepository,"createMovement").mockReturnValue(movement);
      jest.spyOn(mockDatabaseRepository,"selectUserFromAccountId").mockReturnValue(user);
      jest.spyOn(mockDatabaseRepository,"selectAccountById").mockReturnValue(account);
      jest.spyOn(mockDatabaseRepository,"get1Movement").mockReturnValue(movement);

      const result=await movementsService.createMovement(movement);
      expect(result).toBe(true);
    });
  });

  describe('Select Movements', () => {
    it("Should list Movements of an Account", async () => {
      jest.spyOn(mockDatabaseRepository,"selectMovementsFromAccountId").mockReturnValue([movement]);
      const result=await movementsService.listMovements(account);
      expect(result).toStrictEqual([movement]);
    })
  })

  describe('Delete Movement', () => {
    it("Should Delete a Movement", async () => {
      jest.spyOn(mockDatabaseRepository,"deleteMovementById")
      jest.spyOn(mockDatabaseRepository,"selectMovementsFullAccountsUsersFromMovementId").mockReturnValue(movement);

      const result=await movementsService.deleteMovement(movement);
      
      expect(mockDatabaseRepository.deleteMovementById).toHaveBeenCalledWith(movement);
      expect(result).toBeUndefined();
    })
  })
});
