import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
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


  async create(createBlockchainAccountDTO:CreateBlockchainAccountDTO, user:Users) {
    this.web3Service.node.eth.sendSignedTransaction(createBlockchainAccountDTO.signedTransaction.rawTransaction);  

    const blockChainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, createBlockchainAccountDTO);
    blockChainAccount.user=user;

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
    //Send Signed Transaction from DTO and Get To check
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);

    if (getTransaction.to.toLowerCase() == this.web3Service.bankerAddress.toLowerCase()) {
      //Convert from Eth To Euros
      const conversionEurosToEth = parseInt(process.env.EURO_TO_ETH);
      const amountEther = this.web3Service.node.utils.fromWei(getTransaction.value, "ether");
      const euros = parseFloat(amountEther) * conversionEurosToEth;

      //Create and Send Movement
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
        money: euros,
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
    //Send Signed Transaction from DTO and Get To check
    const transactionDone = await this.web3Service.sendSignedTransaction(depositFromBlockChainDTO.signedTransaction);
    const getTransaction = await this.web3Service.getTransaction(transactionDone.transactionHash);

    //Check Method Used and Parameters to Send
    const methodInfo = (await this.buildingsContractService.decodeMethodAndParametersOfSend(getTransaction));
    //console.log(methodInfo);
    const eurosAmount=parseInt(methodInfo.amount as string)/100;

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
        money: eurosAmount,
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

    //Make Movement of Account, if Doesnt work (insufficient Balance), throw error
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

    //Convert to Wei From Euros
    const euroToEth = parseInt(process.env.EURO_TO_ETH as string);
    const ethToSend = depositToBlockChainDTO.amount / euroToEth;

    const ethConverted = this.web3Service.node.utils.toWei(ethToSend.toFixed(21), "ether");

    //Sign Transaction and Send From Banker Account To Normal User Account
    const signedTransaction = await this.web3Service.signBankerTransaction(depositToBlockChainDTO.toBlockChainAccountAddress, parseFloat(ethConverted));
    await this.web3Service.sendSignedTransaction(signedTransaction);



  }
  async depositToBC(depositToBlockChainDTO: DepositToBlockChainDTO, user: Users) {
    await this.databaseRepository.selectAccountByIdAndUserId(depositToBlockChainDTO.fromNormalAccountId, user.id);

    //Make Movement of Account, if Doesnt work (insufficient Balance), throw error

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


    //Convert Euros to BC (*100)
    const BCAmount=depositToBlockChainDTO.amount*100;

    //Sign Transaction and Send From Banker Account To Normal User Account
    const transferBC = await this.buildingsContractService.transfer(depositToBlockChainDTO.toBlockChainAccountAddress, BCAmount);
    const signedTransaction = await this.web3Service.bankerAccount.signTransaction({
      from: this.web3Service.bankerAccount.address,
      to: this.buildingsContractService.contractAddress,
      value: 0,
      data: transferBC.encodeABI(),
      gasPrice: await this.web3Service.node.eth.getGasPrice()
    });

    const signed = await this.web3Service.sendSignedTransaction(signedTransaction);

    console.log(await this.buildingsContractService.getTotalSuply());


  }
}
