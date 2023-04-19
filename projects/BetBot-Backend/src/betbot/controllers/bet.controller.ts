import { Param, Query } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { logServer } from 'src/utils/log';
import { BetbotService } from '../services/betbot.service';
import { PlaceBetDto, GetUsersBetsDto } from '../dto';

@Controller('betbot')
@UseGuards(AuthGuard('api-key'))
export class BetController {
  constructor(private readonly betbotService: BetbotService) {}

  @Post('bet')
  async placeBet(@Body() placeBetDto: PlaceBetDto) {
    logServer(`Bet placed by ${placeBetDto.userId}`);
    return this.betbotService.placeBet(placeBetDto);
  }

  @Get('bet/user/:id')
  async getActiveBets(
    @Param('id') discordId: string,
    @Query() getUsersBetsDto: Omit<GetUsersBetsDto, 'userId'>,
  ) {
    return this.betbotService.getUsersBets({
      userId: discordId,
      ...getUsersBetsDto,
    });
  }
}
