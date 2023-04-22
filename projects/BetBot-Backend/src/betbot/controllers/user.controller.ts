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

@Controller('betbot')
@ApiTags('BetBot', 'User')
@UseGuards(AuthGuard('api-key'))
export class UserController {
  constructor(private readonly betbotService: BetbotService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.betbotService.createUser(createUserDto);
  }

  @Get('user')
  async findUser(@Query() getUserDto: GetUserDto) {
    if (!Object.keys(getUserDto).length) return;

    return this.betbotService.findUser(getUserDto);
  }

  @Get('user/:id/bet')
  async getActiveBets(@Query() getUsersBetsDto: GetUsersBetsDto) {
    return this.betbotService.getUsersBets(getUsersBetsDto);
  }

  @Post('user/:id/stats')
  async calcStats(@Param('id') discordId: string) {
    console.log(discordId);
    return this.betbotService.calcStats({ userId: discordId });
  }
}
