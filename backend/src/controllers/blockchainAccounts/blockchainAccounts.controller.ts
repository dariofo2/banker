import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, ValidationPipe, UsePipes, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { BlockchainAccountsService } from './blockchainAccounts.service';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import { Users } from 'src/database/entity/users.entity';
import { MainAuthGuard } from 'src/auth/mainauth.guard';
import { CreateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/createBlockchainAccount.dto';
import { plainToInstance } from 'class-transformer';
import { GetBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/getBlockChainAccount.dto';
import { UpdateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/updateBlockchainAccount.dto';
import { DeleteBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/deleteBlockchainAccount.dto';
import { DepositFromBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositFromBlockchain.dto';
import { DepositToBlockChainDTO } from 'src/database/dto/blockchainAccounts/depositToBlockchain.dto';
@UseGuards(MainAuthGuard)
@UsePipes(new ValidationPipe({transform:true}))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('blockchainAccounts')
export class BlockchainAccountsController {
  constructor(private readonly blockchainAccountsService: BlockchainAccountsService) { }

  @Post("create")
  @UsePipes(new ValidationPipe())
  async create(@Req() req: any, @Body() createBlockchainAccountDTO: CreateBlockchainAccountDTO) {
    try {
      return await this.blockchainAccountsService.create(createBlockchainAccountDTO,req.user);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }

  }

  @Post("lists")
  async findAll(@Req() req: any) {
    const user: Users = req.user;

    return await this.blockchainAccountsService.findAll(user);
  }

  @Post("list")
  async findOne(@Req() req: any, @Body() getBlockchainAccountDTO: GetBlockchainAccountDTO) {
    try {
      const blockchainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, getBlockchainAccountDTO);
      blockchainAccount.user = req.user;

      return await this.blockchainAccountsService.findOne(blockchainAccount);
    } catch (error) {
      //console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }

  @Post('update')
  async update(@Req() req: any, @Body() updateBlockchainAccountDTO: UpdateBlockchainAccountDTO) {
    try {
      const blockchainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, updateBlockchainAccountDTO);
      blockchainAccount.user = req.user;
      console.log(blockchainAccount);
      return await this.blockchainAccountsService.update(blockchainAccount);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }

  @Post('delete')
  async remove(@Req() req: any, @Body() deleteBlockchainAccountDTO: DeleteBlockchainAccountDTO) {
    try {
      const blockchainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, deleteBlockchainAccountDTO);
      blockchainAccount.user = req.user;

      return await this.blockchainAccountsService.remove(blockchainAccount);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }

  @Post('depositFromEth')
  async depositFromEth (@Req() req:any,@Body() depositFromBlockChainDTO: DepositFromBlockChainDTO) {
    try {
      await this.blockchainAccountsService.depositFromEth(depositFromBlockChainDTO,req.user);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    } 
    }
  }

  @Post('depositFromBC')
  async depositFromBC (@Req() req:any,@Body() depositFromBlockChainDTO: DepositFromBlockChainDTO) {
    try {
      await this.blockchainAccountsService.depositFromBC(depositFromBlockChainDTO,req.user);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }

  @Post('depositToEth')
  async depositToEth (@Req() req:any,@Body() depositToBlockchainDTO: DepositToBlockChainDTO) {
    try {
      await this.blockchainAccountsService.depositToEth(depositToBlockchainDTO,req.user);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }

  @Post('depositToBC')
  async depositToBC (@Req() req:any,@Body() depositToBlockChainDTO: DepositToBlockChainDTO) {
    try {
      await this.blockchainAccountsService.depositToBC(depositToBlockChainDTO,req.user);
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
    } else {
        throw new BadRequestException("Fatal Error");
    }
    }
  }
}
