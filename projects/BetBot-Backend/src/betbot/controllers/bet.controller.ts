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
import { PlaceBetDto, GetUsersBetsDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { GetBets, PlaceBet } from './api-descriptions/bet.api';
import { PlaceBetControllerResponse, PlaceBetsServiceResponse, GetBetsControllerResponse, GetBetsServiceResponse  } from '../entities';
import { SecurityHeader } from './api-descriptions/headers.api';
import { BetService } from '../services/bets.service';

@Controller('betbot')
@ApiTags('BetBot', 'Bet')
@UseGuards(AuthGuard('api-key'))
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post('bet')
  @SecurityHeader()
  @PlaceBet()
  async placeBet(@Body() placeBetDto: PlaceBetDto): Promise<PlaceBetControllerResponse> {
    logServer(`Bet placed by ${placeBetDto.userId}`);
    const bet: PlaceBetsServiceResponse = await this.betService.placeBet(placeBetDto);
    return { message: 'COMPLETE', betId: bet.id };
  }

  @Get('bet/user')
  @SecurityHeader()
  @GetBets()
  async getUserBets(@Query() getUsersBetsDto: GetUsersBetsDto ): Promise<GetBetsControllerResponse> {
    const bets: GetBetsServiceResponse = await this.betService.getUsersBets(getUsersBetsDto);
    return { message: 'COMPLETE', bets: bets }
  }
}
