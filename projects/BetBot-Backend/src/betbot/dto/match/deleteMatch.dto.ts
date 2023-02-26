import { PickType } from '@nestjs/mapped-types';
import { IsMongoId, IsString } from 'class-validator';
import { MatchDto } from '../match.dto';

export class DeleteMatchDto extends PickType(MatchDto, [
  'eventTitle',
  'matchTitle',
] as const) {}

export class DeleteMatchByIdDto {
  @IsString()
  id: string;
}
