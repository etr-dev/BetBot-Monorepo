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
import { logServer } from 'src/utils/log';
import {
  CreateMatchDto,
  CompleteMatchDto,
  DeleteMatchDto,
  DeleteMatchByIdDto,
  GetMatchDto,
} from '../dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompleteMatch, CreateMatch, DeleteMatch, DeleteMatchById, GetMatch } from './api-descriptions/match.api';
import { SecurityHeader } from './api-descriptions/headers.api';
import { CompleteMatchControllerResponse, CompleteMatchServiceResponse, CreateMatchControllerResponse, CreateMatchServiceResponse, DeleteMatchControllerResponse, DeleteMatchServiceResponse, GetMatchControllerResponse, GetMatchServiceResponse } from '../entities';
import { MatchService } from '../services/match.service';

@Controller('betbot')
@ApiTags('BetBot', 'Match')
@UseGuards(AuthGuard('api-key'))
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('match')
  @SecurityHeader()
  @CreateMatch()
  async createMatch(@Body() createMatchDto: CreateMatchDto): Promise<CreateMatchControllerResponse> {
    const match: CreateMatchServiceResponse = await this.matchService.createMatch(createMatchDto);
    return { message: 'CREATED', data: match };
  }

  @Post('match/complete')
  @SecurityHeader()
  @CompleteMatch()
  async matchComplete(@Body() completeMatchDto: CompleteMatchDto): Promise<CompleteMatchControllerResponse> {
    logServer(`Completing match ${completeMatchDto.matchTitle}`);
    const completedBetIds: CompleteMatchServiceResponse = await this.matchService.completeMatch(completeMatchDto);
    return { message: 'COMPLETE', data: completedBetIds };
  }

  @Delete('match')
  @SecurityHeader()
  @DeleteMatch()
  async deleteMatch(@Query() deleteMatchDto: DeleteMatchDto): Promise<DeleteMatchControllerResponse> {
    const data: DeleteMatchServiceResponse = await this.matchService.deleteMatch(deleteMatchDto);
    return { message: 'DELETED', data };
  }

  @Delete('match/:id')
  @SecurityHeader()
  @DeleteMatchById()
  async deleteMatchById(@Param() matchId: DeleteMatchByIdDto): Promise<DeleteMatchControllerResponse> {
    const data: DeleteMatchServiceResponse = await this.matchService.deleteMatch(matchId);
    return { message: 'DELETED', data };
  }

  @Get('match')
  @SecurityHeader()
  @GetMatch()
  async findMatch(@Body() getMatchDto: GetMatchDto): Promise<GetMatchControllerResponse> {
    const matches: GetMatchServiceResponse = await this.matchService.getMatch(getMatchDto);
    return { message: 'FOUND', data: matches };
  }
}
