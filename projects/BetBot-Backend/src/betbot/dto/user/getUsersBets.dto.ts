import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { BetSelection } from 'src/betbot/entities/enums/betSelection.enum';
import { UserDto } from '../user.dto';

export class GetUsersBetsDto extends PickType(UserDto, ['userId'] as const) {
  @IsEnum(BetSelection)
  betSelection: BetSelection;

  @IsBoolean()
  attachMatchInfo: boolean = false;
}
