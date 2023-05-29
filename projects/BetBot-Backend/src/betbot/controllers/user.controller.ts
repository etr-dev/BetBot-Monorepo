import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetbotService } from '../services/betbot.service';
import { CreateUserDto, GetUserDto, GetUsersBetsDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { SecurityHeader } from './api-descriptions/headers.api';
import { CalcStatsResponse, CreateUserResponse, FindUserResponse, GetBetsResponse } from '../entities';

@Controller('betbot')
@ApiTags('BetBot', 'User')
@UseGuards(AuthGuard('api-key'))
export class UserController {
  constructor(private readonly betbotService: BetbotService) {}

  @Post('user')
  @SecurityHeader()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.betbotService.createUser(createUserDto);
  }

  @Get('user')
  @SecurityHeader()
  async findUser(@Query() getUserDto: GetUserDto): Promise<FindUserResponse> {
    if (!Object.keys(getUserDto).length) return;

    return this.betbotService.findUser(getUserDto);
  }

  @Get('user/:id/bet')
  @SecurityHeader()
  async getActiveBets(@Query() getUsersBetsDto: GetUsersBetsDto): Promise<GetBetsResponse> {
    return this.betbotService.getUsersBets(getUsersBetsDto);
  }

  @Post('user/:id/stats')
  @SecurityHeader()
  async calcStats(@Param('id') discordId: string): Promise<CalcStatsResponse> {
    return this.betbotService.calcStats({ userId: discordId });
  }
}
