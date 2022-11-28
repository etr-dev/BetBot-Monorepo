import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CornerInfoDto {
  @IsString()
  name: string;

  @IsString()
  odds: string;

  @IsString()
  outcome: string;
}
