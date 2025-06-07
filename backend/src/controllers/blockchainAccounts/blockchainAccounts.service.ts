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
import { BuildingsContractService } from 'src/web3/buildingsContract.service';
import { Web3Service } from 'src/web3/web3.service';
@Injectable()
export class BlockchainAccountsService {
  constructor(
    private readonly databaseRepository: DatabaseRepository,
    private readonly web3Service: Web3Service,
    private readonly buildingsContractService: BuildingsContractService
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

  async depositFromEth(depositFromBlockChainDTO: DepositFromBlockChainDTO, user: Users) {
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);
    if (getTransaction.to.toLowerCase() == this.web3Service.bankerAddress.toLowerCase()) {
      const createMovement = {
        type: "deposit",
        concept: getTransaction.from,
        originAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user: user
        },
        destinationAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user: user
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

  async depositFromBC(depositFromBlockChainDTO: DepositFromBlockChainDTO, user: Users) {
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);
    
    const methodInfo=(await this.buildingsContractService.decodeMethodAndParametersOfSend(getTransaction));
    //console.log(methodInfo);
    if (methodInfo.__method__.split("(")[0] != "transfer") throw new BadRequestException("El Metodo no es Transfer, es " + methodInfo.__method__);
    if ((methodInfo.to as string).toLowerCase() == this.web3Service.bankerAddress.toLowerCase()) {
      const createMovement = {
        type: "deposit",
        concept: getTransaction.from,
        originAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user: user
        },
        destinationAccount: {
          id: depositFromBlockChainDTO.toAccountId,
          user: user
        },
        money: parseInt(methodInfo.amount as string),
        date: parseInt(moment().format("X"))
      }

      const movement = plainToClass(Movements, createMovement);

      this.databaseRepository.createMovement(movement);
    } else {
      throw new BadRequestException("La transacción no ha sido a la cuenta correcta");
    }
    return
  }

  async depositToEth(depositToBlockChainDTO: DepositToBlockChainDTO, user: Users) {
    await this.databaseRepository.selectAccountByIdAndUserId(depositToBlockChainDTO.fromNormalAccountId, user.id);

    const signedTransaction = await this.web3Service.signBankerTransaction(depositToBlockChainDTO.toBlockChainAccountAddress, depositToBlockChainDTO.amount);
    await this.web3Service.sendSignedTransaction(signedTransaction);

    const createMovement = {
      type: "depositToBlockchain",
      concept: depositToBlockChainDTO.toBlockChainAccountAddress,
      originAccount: {
        id: depositToBlockChainDTO.fromNormalAccountId,
        user: user
      },
      destinationAccount: {
        id: depositToBlockChainDTO.fromNormalAccountId,
        user: user
      },
      money: depositToBlockChainDTO.amount,
      date: parseInt(moment().format("X"))
    }

    const movement = plainToClass(Movements, createMovement);

    this.databaseRepository.createMovement(movement);

  }
  async depositToBC(depositToBlockChainDTO: DepositToBlockChainDTO, user: Users) {
    await this.databaseRepository.selectAccountByIdAndUserId(depositToBlockChainDTO.fromNormalAccountId, user.id);

    const transferBC=await this.buildingsContractService.transfer(depositToBlockChainDTO.toBlockChainAccountAddress, depositToBlockChainDTO.amount);
    const signedTransaction=await this.web3Service.bankerAccount.signTransaction({
      from: this.web3Service.bankerAccount.address,
      to: this.buildingsContractService.contractAddress,
      value: 0,
      data:transferBC.encodeABI(),
      gasPrice:await this.web3Service.node.eth.getGasPrice()
    });

    await this.web3Service.sendSignedTransaction(signedTransaction);

    const createMovement = {
      type: "depositToBlockchain",
      concept: depositToBlockChainDTO.toBlockChainAccountAddress,
      originAccount: {
        id: depositToBlockChainDTO.fromNormalAccountId,
        user: user
      },
      destinationAccount: {
        id: depositToBlockChainDTO.fromNormalAccountId,
        user: user
      },
      money: depositToBlockChainDTO.amount,
      date: parseInt(moment().format("X"))
    }

    const movement = plainToClass(Movements, createMovement);

    this.databaseRepository.createMovement(movement);

  }
}
