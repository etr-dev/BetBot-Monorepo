import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { CornerDetailsDto } from './match/nested/cornerDetails.dto';
import { PostMatchInfoDto } from './match/nested/postMatchInfo.dto';

export class MatchDto {
  @IsString()
  @ApiProperty({
      description: 'The identifying id of the match.',
      example:'640a00fafd9f0f55c90003f1',
  })
  @IsOptional()
  _id?: string;

  @IsString()
  @ApiProperty({
    description: "The title of the UFC Event.",
    example: 'UFC Fight Night March 11 2023'
  })
  eventTitle: string;

  @IsString()
  @ApiProperty({
    description: "The title of the UFC match, typically fighter vs fighter.",
    example: 'Petr Yan vs Merab Dvalishvili'
  })
  matchTitle: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'The link to the event, not the specific match.',
    example: "https://www.ufc.com/event/ufc-fight-night-march-11-2023",
  })
  link: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Has the match been completed.',
    example: true,
  })
  isComplete: boolean;

  @ValidateNested()
  @Type(() => CornerDetailsDto)
  @ApiProperty({ type: () => CornerDetailsDto })
  Red: CornerDetailsDto;

  @ValidateNested()
  @Type(() => CornerDetailsDto)
  @ApiProperty({ type: () => CornerDetailsDto })
  Blue: CornerDetailsDto;

  @ValidateNested()
  @Type(() => PostMatchInfoDto)
  @ApiProperty({ type: () => PostMatchInfoDto })
  postMatchInfo: PostMatchInfoDto;
}
