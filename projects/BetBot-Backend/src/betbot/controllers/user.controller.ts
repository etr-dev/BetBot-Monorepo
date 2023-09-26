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
import { CreateUserDto, GetUserBetsParamDto, GetUserBetsQueryDto, GetUserDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { SecurityHeader } from './api-descriptions/headers.api';
import { CalcStatsControllerResponse, CreateUserControllerResponse, CreateUserServiceResponse, GetUsersControllerResponse, GetUsersServiceResponse, GetBetsControllerResponse, GetBetsServiceResponse } from '../entities';
import { CalcStats, CreateUser, FindUser } from './api-descriptions/user.api';
import { UserService } from '../services/user.service';
import { BetService } from '../services/bets.service';
import { GetBets } from './api-descriptions/bet.api';

@Controller('betbot')
@ApiTags('BetBot', 'User')
@UseGuards(AuthGuard('api-key'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly betService: BetService,
    ) {}

  @Post('user')
  @SecurityHeader()
  @CreateUser()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserControllerResponse> {
    const user: CreateUserServiceResponse = await this.userService.createUser(createUserDto);
    return { message: 'CREATED', data: user } // TODO: should have a way to tell if found/created
  }

  @Get('user')
  @SecurityHeader()
  @FindUser()
  async getUsers(@Query() getUserDto: GetUserDto): Promise<GetUsersControllerResponse> {
    if (!Object.keys(getUserDto).length) return;

    const users: GetUsersServiceResponse = await this.userService.getUsers(getUserDto);
    return { message: 'FOUND', data: users };
  }

  @Get('user/:id/bets')
  @GetBets()
  @SecurityHeader()
  async GetUserBets(@Param() param: GetUserBetsParamDto, @Query() getUsersBetsQueryDto: GetUserBetsQueryDto): Promise<GetBetsControllerResponse> {
    const bets: GetBetsServiceResponse = await this.betService.getUsersBets({...param, ...getUsersBetsQueryDto});
    return { message: 'COMPLETE', bets: bets }
  }

  @Post('user/:id/stats')
  @SecurityHeader()
  @CalcStats()
  async calcStats(@Param('id') discordId: string): Promise<CalcStatsControllerResponse> {
    const user = await this.userService.calcStats({ userId: discordId });
    return { message: 'COMPLETE', data: user };
  }
}
