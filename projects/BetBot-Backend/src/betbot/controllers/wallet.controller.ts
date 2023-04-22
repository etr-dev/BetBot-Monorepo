import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetbotService } from '../services/betbot.service';
import { GetWalletDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { GetWallet } from './api-descriptions/wallet.api';

@Controller('betbot')
@ApiTags('BetBot', 'Wallet')
@UseGuards(AuthGuard('api-key'))
export class WalletController {
  constructor(private readonly betbotService: BetbotService) {}

  @Get('wallet')
  @GetWallet()
  async wallet(@Query() getWalletDto: GetWalletDto) {
    return this.betbotService.wallet(getWalletDto);
  }
}
