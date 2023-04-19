import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetbotService } from '../betbot.service';
import { GetWalletDto } from '../dto';

@Controller('betbot')
@UseGuards(AuthGuard('api-key'))
export class WalletController {
  constructor(private readonly betbotService: BetbotService) {}

  @Get('wallet')
  async wallet(@Body() getWalletDto: GetWalletDto) {
    return this.betbotService.wallet(getWalletDto);
  }
}
