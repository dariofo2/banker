import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as moment from 'moment';
import { DatabaseRepository } from 'src/database/database.repository';
import { CreateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/createBlockchainAccount.dto';
import { DepositFromBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositFromBlockchain.dto';
import { DepositToBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositToBlockchain.dto';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import { Movements } from 'src/database/entity/movements.entity';
import { Users } from 'src/database/entity/users.entity';
import { Web3Service } from 'src/web3/web3.service';
//import * as json "src/web3/Buildings.json";
@Injectable()
export class BlockchainAccountsService {
  constructor(
    private readonly databaseRepository: DatabaseRepository,
    private readonly web3Service: Web3Service
  ) { }


  async create(blockChainAccount: BlockchainAccounts) {
    return await this.databaseRepository.createBlockchainAccount(blockChainAccount);
  }

  async findAll(user: Users) {
    return await this.databaseRepository.selectBlockChainAccountsByUserId(user.id);
  }

  async findOne(blockchainAccount: BlockchainAccounts) {
    return await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id, blockchainAccount.user.id);
  }

  async update(blockchainAccount: BlockchainAccounts) {
    await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id, blockchainAccount.user.id);
    return await this.databaseRepository.updateBlockChainAccount(blockchainAccount);
  }

  async remove(blockchainAccount: BlockchainAccounts) {
    await this.databaseRepository.selectBlockChainAccountByIdAndUserId(blockchainAccount.id, blockchainAccount.user.id);
    await this.databaseRepository.deleteBlockchainAccountById(blockchainAccount);
    return "Delete Done";
  }

  async depositFromEth(depositFromBlockChainDTO: DepositFromBlockChainDTO,user:Users) {
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);
    if (getTransaction.to.toLowerCase() == this.web3Service.bankerAddress.toLowerCase()) {
      const createMovement = {
        type: "deposit",
        concept: getTransaction.from,
        originAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user:user
        },
        destinationAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user:user
        },
        money: parseInt(getTransaction.value.toString()),
        date: parseInt(moment().format("X"))
      }

      const movement = plainToClass(Movements, createMovement);

      this.databaseRepository.createMovement(movement);
    } else {
      throw new BadRequestException("La transacción no ha sido a la cuenta correcta");
    }
    return
  }

  async depositFromBC(depositFromBlockChainDTO: DepositFromBlockChainDTO,user:Users) {
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);
    
    //console.log(this.web3Service.node.eth.abi.decodeParameters());
    if (getTransaction.to.toLowerCase() == this.web3Service.bankerAddress.toLowerCase()) {
      const createMovement = {
        type: "deposit",
        concept: getTransaction.from,
        originAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user:user
        },
        destinationAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user:user
        },
        money: parseInt(getTransaction.value.toString()),
        date: parseInt(moment().format("X"))
      }

      const movement = plainToClass(Movements, createMovement);

      this.databaseRepository.createMovement(movement);
    } else {
      throw new BadRequestException("La transacción no ha sido a la cuenta correcta");
    }
    return
  }

  async depositToEth (depositToBlockChainDTO:DepositToBlockChainDTO,user:Users) {
    await this.databaseRepository.selectAccountByIdAndUserId(depositToBlockChainDTO.fromNormalAccountId,user.id);

    const signedTransaction=await this.web3Service.signBankerTransaction(depositToBlockChainDTO.toBlockChainAccountAddress,depositToBlockChainDTO.amount);
    await this.web3Service.sendSignedTransaction(signedTransaction);
  }
  async depositToBC () {

  }
}
