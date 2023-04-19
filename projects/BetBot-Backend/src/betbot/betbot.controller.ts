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
import {
  CreateUserDto,
  CreateMatchDto,
  PlaceBetDto,
  CompleteMatchDto,
  DeleteMatchDto,
  DeleteMatchByIdDto,
  GetWalletDto,
  GetUsersBetsDto,
  GetMatchDto,
  GetUserDto,
} from './dto';

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
