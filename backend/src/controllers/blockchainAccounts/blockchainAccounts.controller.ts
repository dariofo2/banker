import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { BlockchainAccountsService } from './blockchainAccounts.service';
import { BlockchainAccounts } from 'src/database/entity/blockchainAccounts.entity';
import { Users } from 'src/database/entity/users.entity';
import { MainAuthGuard } from 'src/auth/mainauth.guard';
import { CreateBlockchainAccountDTO } from 'src/database/dto/blockchainAccounts/createBlockchainAccount.dto';

@Controller('blockchainAccounts')
@UseGuards(MainAuthGuard)
export class BlockchainAccountsController {
  constructor(private readonly blockchainAccountsService: BlockchainAccountsService) {}

  @Post("create")
  create(@Req() req:any, @Body() blockChainAccount:BlockchainAccounts) {
    try {
      return this.blockchainAccountsService.create(blockChainAccount);

    } catch (error) {
      console.error(error);
      throw new BadRequestException;
    }
    
  }

  @Post("lists")
  findAll(@Req() req:any) {
    const user:Users=req.user;
    return this.blockchainAccountsService.findAll(user);
  }

  @Post("list")
  findOne(@Req() req:any,@Body() blockchainAccount: BlockchainAccounts) {
    blockchainAccount.user=req.user;
    return this.blockchainAccountsService.findOne(blockchainAccount);
  }

  @Post('update')
  update(@Req() req:any,@Body() blockchainAccount: BlockchainAccounts) {
    blockchainAccount.user=req.user;
    return this.blockchainAccountsService.update(blockchainAccount);
  }

  @Delete('delete')
  remove(@Req() req:any,@Body() blockchainAccount: BlockchainAccounts) {
    blockchainAccount.user=req.user;
    return this.blockchainAccountsService.remove(blockchainAccount);
  }
}
