import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { logServer } from 'src/utils/log';
import { BetbotService } from './betbot.service';
import { CreateUserDto } from './dto/user/createUser.dto';
import { GetUsersBetsDto } from './dto/user/getUsersBets.dto';
import { GetWalletDto } from './dto/wallet/getWallet.dto';
import { CreateMatchDto } from './dto/match/createMatch.dto';
import { GetMatchDto } from './dto/match/getMatch.dto';
import { CompleteMatchDto } from './dto/match/completeMatch.dto';
import { PlaceBetDto } from './dto/bet/placeBet.dto';
import { GetUserDto } from './dto/user/getUser.dto';
import { use } from 'passport';

@Controller('betbot')
@UseGuards(AuthGuard('api-key'))
export class BetbotController {
  constructor(private readonly betbotService: BetbotService) {}

  @Delete()
  async drop() {
    return this.betbotService.drop();
  }

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.betbotService.createUser(createUserDto);
  }

  @Post('createMatch')
  async createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.betbotService.createMatch(createMatchDto);
  }

  @Post('placeBet')
  async placeBet(@Body() placeBetDto: PlaceBetDto) {
    logServer(`Bet placed by ${placeBetDto.userId}`);
    return this.betbotService.placeBet(placeBetDto);
  }

  @Post('completeMatch')
  async matchComplete(@Body() completeMatchDto: CompleteMatchDto) {
    logServer(`Completing match ${completeMatchDto.matchTitle}`);
    return this.betbotService.completeMatch(completeMatchDto);
  }

  @Get('wallet')
  async wallet(@Body() getWalletDto: GetWalletDto) {
    return this.betbotService.wallet(getWalletDto);
  }

  @Get('getUsersBets')
  async getActiveBets(@Body() getUsersBetsDto: GetUsersBetsDto) {
    return this.betbotService.getUsersBets(getUsersBetsDto);
  }

  @Get('getMatch')
  async getMatch(@Body() getMatchDto: GetMatchDto) {
    return this.betbotService.getMatch(getMatchDto);
  }

  @Get('getAllIncompleteMatchLinks')
  async getAllIncompleteMatchLinks() {
    return this.betbotService.getAllIncompleteMatchLinks();
  }

  @Get('user')
  async findUser(@Query() getUserDto: GetUserDto) {
    if (!Object.keys(getUserDto).length) return;

    return this.betbotService.findUser(getUserDto);
  }

  @Post('user/:id/stats')
  async calcStats(@Param('id') discordId: string) {
    console.log(discordId);
    return this.betbotService.calcStats({ userId: discordId });
  }

  @Get('findAllUsers')
  async findAll() {
    return this.betbotService.findAll();
  }
}
