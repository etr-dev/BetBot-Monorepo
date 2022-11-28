import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { CornerDetailsDto } from './cornerDetails.dto';
import { CornerInfoDto } from './cornerInfo.dto';

export class PostMatchInfoDto {
  @IsString()
  result: string;

  @IsString()
  method: string;

  @IsString()
  time: string;

  @IsNumber()
  @Max(5)
  round: number;

  @ValidateNested()
  @Type(() => CornerInfoDto)
  Red: CornerInfoDto;

  @ValidateNested()
  @Type(() => CornerInfoDto)
  Blue: CornerInfoDto;
}
