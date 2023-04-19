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
import { BetbotService } from '../betbot.service';
import { CreateUserDto, GetUserDto, GetUsersBetsDto } from '../dto';

@Controller('betbot')
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
  async getActiveBets(
    @Param('id') discordId: string,
    @Query() getUsersBetsDto: Omit<GetUsersBetsDto, 'userId'>,
  ) {
    return this.betbotService.getUsersBets({
      userId: discordId,
      ...getUsersBetsDto,
    });
  }

  @Post('user/:id/stats')
  async calcStats(@Param('id') discordId: string) {
    console.log(discordId);
    return this.betbotService.calcStats({ userId: discordId });
  }
}
