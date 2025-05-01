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
      const blockChainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, createBlockchainAccountDTO);
      blockChainAccount.user = req.user;

      return await this.blockchainAccountsService.create(blockChainAccount);
    } catch (error) {
      console.error(error);
      throw new BadRequestException;
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
      throw new BadRequestException;
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
      throw new BadRequestException;
    }
  }

  @Delete('delete')
  async remove(@Req() req: any, @Body() deleteBlockchainAccountDTO: DeleteBlockchainAccountDTO) {
    try {
      const blockchainAccount: BlockchainAccounts = plainToInstance(BlockchainAccounts, deleteBlockchainAccountDTO);
      blockchainAccount.user = req.user;

      return await this.blockchainAccountsService.remove(blockchainAccount);
    } catch (error) {
      console.error(error);
      throw new BadRequestException;
    }
  }
}
