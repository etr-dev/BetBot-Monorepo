import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsString, ValidateNested } from 'class-validator';
import { UserBetsDto } from './user/nested/userBets.dto';

export class UserDto {
  @IsNumberString()
  @ApiProperty({
    description: 'The identifying id for the user, also their discord id.',
    example: '211663642280722433'
  })
  userId: string;

  @IsString({ each: true })
  @ApiProperty({
    description: 'The discord guild id for discord servers that the user is in and uses betbot.',
    example: ['211663885898481665','1076566193621708892'],
    isArray: true,
  })
  discordGuildIdList: string[];

  @IsString()
  @ApiProperty({
    description: 'The discord username of the user.',
    example: 'idgnfs'
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: "The identifying id for the user's wallet, only one wallet per user.",
    example: '6312f18ffab84e025633c4ee'
  })
  walletId: string;

  @ValidateNested()
  @Type(() => UserBetsDto)
  userBets: UserBetsDto;
}
