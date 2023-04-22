import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { CornerInfoDto } from './cornerInfo.dto';

export class PostMatchInfoDto {
  @IsString()
  @ApiProperty({
    description: 'The result of the match: BLUE, RED, NO_CONTEST, maybe more?',
    example: "BLUE",
  })
  result: string;

  @IsString()
  @ApiProperty({
    description: 'The way the fight was completed: submission, KO, TKO, Decision - Unanimous, Decision - Split, etc.',
    example: "Decision - Unanimous",
  }) 
  method: string;

  @IsString()
  @ApiProperty({
    description: 'The time of the round the match was completed.',
    example: "5:00",
  }) 
  time: string;

  @IsNumber()
  @Max(5)
  @ApiProperty({
    description: 'The round that the fight ended in.',
    example: 5,
  }) 
  round: number;

  @ValidateNested()
  @Type(() => CornerInfoDto)
  @ApiProperty({ type: () => CornerInfoDto })
  Red: CornerInfoDto;

  @ValidateNested()
  @Type(() => CornerInfoDto)
  @ApiProperty({ type: () => CornerInfoDto })
  Blue: CornerInfoDto;
}
