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
import { ApiTags } from '@nestjs/swagger';
import { GetBets, PlaceBet } from './api-descriptions/bet.api';
import { PlaceBetResponse } from '../entities';

@Controller('betbot')
@ApiTags('BetBot', 'Bet')
@UseGuards(AuthGuard('api-key'))
export class BetController {
  constructor(private readonly betbotService: BetbotService) {}

  @Post('bet')
  @PlaceBet()
  async placeBet(@Body() placeBetDto: PlaceBetDto): Promise<PlaceBetResponse> {
    logServer(`Bet placed by ${placeBetDto.userId}`);
    return this.betbotService.placeBet(placeBetDto);
  }

  @Get('bet/user')
  @GetBets()
  async getActiveBets(
    @Query() getUsersBetsDto: GetUsersBetsDto,
  ) {
    return this.betbotService.getUsersBets(getUsersBetsDto);
  }
}
