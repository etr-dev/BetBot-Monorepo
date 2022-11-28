import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsString, ValidateNested } from 'class-validator';
import { UserBetsDto } from './user/nested/userBets.dto';

export class UserDto {
  @IsNumberString()
  userId: string;

  @IsNumberString({ each: true })
  discordGuildList: string[];

  @IsString()
  name: string;

  @IsString()
  walletId: string;

  @ValidateNested()
  @Type(() => UserBetsDto)
  userBets: UserBetsDto;
}
