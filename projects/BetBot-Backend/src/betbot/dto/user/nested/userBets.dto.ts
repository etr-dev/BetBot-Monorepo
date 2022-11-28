import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserBetsDto {
  @IsString({ each: true })
  inactiveBets: string[];

  @IsString({ each: true })
  activeBets: string[];
}
