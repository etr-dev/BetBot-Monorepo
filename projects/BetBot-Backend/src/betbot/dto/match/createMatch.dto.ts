import { OmitType, PickType } from '@nestjs/swagger';
import { MatchDto } from '../match.dto';

export class CreateMatchDto extends OmitType(MatchDto, [
  'postMatchInfo',
] as const) {}
