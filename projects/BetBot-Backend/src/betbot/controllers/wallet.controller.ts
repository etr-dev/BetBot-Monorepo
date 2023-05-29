import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetbotService } from '../services/betbot.service';
import { GetWalletDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { GetWalletById } from './api-descriptions/wallet.api';
import { SecurityHeader } from './api-descriptions/headers.api';
import { GetWalletByIdControllerResponse, GetWalletByIdServiceResponse } from '../entities';
import { WalletService } from '../services/wallet.service';

@Controller('betbot')
@ApiTags('BetBot', 'Wallet')
@UseGuards(AuthGuard('api-key'))
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('wallet')
  @SecurityHeader()
  @GetWalletById()
  async getWalletById(@Query() getWalletDto: GetWalletDto): Promise<GetWalletByIdControllerResponse> {
    const wallet: GetWalletByIdServiceResponse = await this.walletService.getWallet(getWalletDto);
    return { message: 'FOUND', data: wallet };
  }
}
