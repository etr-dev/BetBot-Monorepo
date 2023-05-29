import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetbotService } from '../services/betbot.service';
import { GetWalletDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { GetWallet } from './api-descriptions/wallet.api';
import { SecurityHeader } from './api-descriptions/headers.api';
import { FindWalletControllerResponse, FindWalletServiceResponse } from '../entities';
import { WalletService } from '../services/wallet.service';

@Controller('betbot')
@ApiTags('BetBot', 'Wallet')
@UseGuards(AuthGuard('api-key'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('wallet')
  @SecurityHeader()
  @GetWallet()
  async findWallet(@Query() getWalletDto: GetWalletDto): Promise<FindWalletControllerResponse> {
    const wallet: FindWalletServiceResponse = await this.walletService.findWallet(getWalletDto);
    return { message: 'FOUND', data: wallet };
  }
}
