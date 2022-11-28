import { OmitType, PickType } from '@nestjs/swagger';
import { MatchDto } from '../match.dto';

export class CompleteMatchDto extends PickType(MatchDto, [
  'eventTitle',
  'matchTitle',
  'postMatchInfo',
] as const) {}
