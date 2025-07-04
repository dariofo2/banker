/*
import { Test, TestingModule } from "@nestjs/testing";

  let usersService:UsersService;

  const mockDatabaseRepository = {
    deleteUserById: jest.fn(),
    updateUser: jest.fn()
  }

  const user : Users = {
    id:1,
    name:"hola",
    email:"hola@hola.com",
    password:"contraseña",
    accounts:[]
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide:DatabaseRepository,
          useValue:mockDatabaseRepository
        }
      ]
    }).compile();

     usersService = app.get(UsersService);
  });

  describe('delete', () => {
    it('Should delete a user', async () => {
      jest.spyOn(mockDatabaseRepository,"deleteUserById").mockReturnValue(user); 
       
      const result=await usersService.deleteUser(user);
      expect(result).toBe(user);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('update', () => {
    it('Should update a user', async () => {
      jest.spyOn(mockDatabaseRepository,"updateUser").mockReturnValue(user); 
       
      const result=await usersService.updateUser(user);
      expect(result).toBe(user);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
*/