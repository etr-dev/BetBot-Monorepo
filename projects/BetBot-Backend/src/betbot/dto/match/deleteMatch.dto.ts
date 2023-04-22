import { PickType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { MatchDto } from '../match.dto';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMatchDto extends PickType(MatchDto, [
  'eventTitle',
  'matchTitle',
] as const) {}

export class DeleteMatchByIdDto {
  @IsString()
  @ApiProperty({
    description: 'The id of the match',
    example: "640a00faf89f0f55c90003f1",
  }) 
  id: string;
}
