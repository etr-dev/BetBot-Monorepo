import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Match } from 'src/schemas';
import { logServer } from 'src/utils/log';
import { BetbotService } from '../services/betbot.service';
import {
  CreateMatchDto,
  CompleteMatchDto,
  DeleteMatchDto,
  DeleteMatchByIdDto,
  GetMatchDto,
} from '../dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('betbot')
@ApiTags('BetBot', 'Match')
@UseGuards(AuthGuard('api-key'))
export class MatchController {
  constructor(private readonly betbotService: BetbotService) {}

  @Post('match')
  async createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.betbotService.createMatch(createMatchDto);
  }

  @Post('match/complete')
  async matchComplete(@Body() completeMatchDto: CompleteMatchDto) {
    logServer(`Completing match ${completeMatchDto.matchTitle}`);
    return this.betbotService.completeMatch(completeMatchDto);
  }

  @Delete('match')
  async deleteMatch(@Query() deleteMatchDto: DeleteMatchDto) {
    const data = await this.betbotService.deleteMatch(deleteMatchDto);
    return { message: 'COMPLETE', data };
  }

  @Delete('match/:id')
  async deleteMatchById(@Param() matchId: DeleteMatchByIdDto) {
    const data = await this.betbotService.deleteMatch(matchId);
    return { message: 'COMPLETE', data };
  }

  @Get('match')
  async findMatch(@Body() getMatchDto: GetMatchDto) {
    return this.betbotService.getMatch(getMatchDto);
  }
}
