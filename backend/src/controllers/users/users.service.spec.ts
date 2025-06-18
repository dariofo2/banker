//Mock Bcrypt
/*
jest.mock("bcrypt", ()=>({
  compare: jest.fn(()=>Promise.resolve(true)),
  hash: jest.fn(()=>{return Promise.resolve("tjgjfr;2424")})
}));
*/

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from 'src/database/entity/users.entity';
import { DatabaseRepository } from 'src/database/database.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as fs from "fs";
import * as bcrypt from "bcrypt";
describe('UsersService', () => {
  let usersService:UsersService;

  const mockDatabaseRepository = {
    deleteUserById: jest.fn(),
    updateUser: jest.fn(),
    getUserById: jest.fn(),
    login: jest.fn(),
    listUsers: jest.fn()
  }

  //Mock FS Global. With spyon u can mock it only in each test.
  /*
  jest.mock("fs", ()=>({
    mkdir: jest.fn(),
    writeFile:jest.fn(()=>{return true}),
  }));
  */

  const user : Users = {
    id:1,
    name:"hola",
    email:"hola@hola.com",
    password:"contraseña",
    role: 1,
    photo: "",
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
      jest.spyOn(mockDatabaseRepository,"deleteUserById"); 
       
      const result=await usersService.deleteUser(user);
      expect(result).toBe(undefined);
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

  describe('getUser', () => {
    it('Should get an user', async () => {
      jest.spyOn(mockDatabaseRepository,"getUserById").mockReturnValue(user); 
       
      const result=await usersService.getUser(user);

      expect(result).toBe(user);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });

  
  
  describe('updatePhoto', () => {
    it('Should update a Photo of User', async () => {
      jest.spyOn(mockDatabaseRepository,"updateUser").mockReturnValue(user); 
 
      jest.spyOn(fs,"mkdir").mockReturnValue();

      jest.spyOn(fs,"writeFile").mockReturnValue();

      const result=await usersService.updateUserPhoto(user,{photo:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQ"});

      expect(result).toBe(undefined);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
  
  
  describe('updatePassword', () => {
    it('Should update The password of User', async () => {
      jest.spyOn(mockDatabaseRepository,"updateUser").mockReturnValue(user);
      jest.spyOn(mockDatabaseRepository,"login").mockReturnValue(user);  

      jest.spyOn(bcrypt,"compare").mockImplementation(jest.fn(()=>Promise.resolve(true)))
      jest.spyOn(bcrypt,"hash").mockImplementation(jest.fn(()=>Promise.resolve("holadasdwad")))

      const result=await usersService.updateUserPassword(user,{lastPassword:"contraseña",password:"contraseñanueva"});

      expect(result).toBe(user);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('adminList', () => {
    it('Should list for Admin', async () => {
      jest.spyOn(mockDatabaseRepository,"listUsers").mockReturnValue(user);  

      jest.spyOn(bcrypt,"compare").mockImplementation(jest.fn(()=>Promise.resolve(true)))
      jest.spyOn(bcrypt,"hash").mockImplementation(jest.fn(()=>Promise.resolve("holadasdwad")))

      const result=await usersService.adminList({orderName:"hola",orderDirection:"ASC",limit:15,offset:0,draw:1,searchValue:"hola",data:{id:1}});

      expect(result).toBe(user);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('adminUpdate', () => {
    it('Should update User on Admin', async () => {
      jest.spyOn(mockDatabaseRepository,"updateUser").mockReturnValue(user);

      const result=await usersService.adminUpdate({id:1, name:"buenas" , email:"buenas", password: "hola" ,role:1});

      expect(result).toBe(undefined);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('adminUpdatePassword', () => {
    it('Should update the Password of an user on Admin', async () => {
      jest.spyOn(mockDatabaseRepository,"updateUser").mockReturnValue(user);

      jest.spyOn(bcrypt,"hash").mockImplementation(jest.fn(()=>Promise.resolve("holadasdwad")))

      const result=await usersService.adminUpdatePassword({id:1, name:"buenas" , email:"buenas", password: "hola" ,role:1});

      expect(result).toBe(undefined);
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
  
});
