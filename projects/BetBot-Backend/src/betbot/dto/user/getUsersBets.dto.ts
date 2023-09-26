import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { BetSelection } from '../../entities/enums/betSelection.enum';
import { UserDto } from '../user.dto';
import { Transform } from 'class-transformer';

export class GetUsersBetsDto extends PickType(UserDto, ['userId'] as const) {
  @IsEnum(BetSelection)
  @ApiProperty({
    description: 'Specify the status of the bets you want to retrieve. Active bets that have not finished, Inactive which have been completed, and All which retrieves both.',
    example: BetSelection.ACTIVE
  })
  betSelection: BetSelection;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiProperty({
    description: 'Specify whether the information about the match should be attached to the response.',
    example: true
  })
  attachMatchInfo: boolean = false;
}

export class GetUserBetsQueryDto extends PickType(GetUsersBetsDto, ['attachMatchInfo', 'betSelection'] as const) {};
export class GetUserBetsParamDto extends PickType(GetUsersBetsDto, ['userId'] as const) {};

