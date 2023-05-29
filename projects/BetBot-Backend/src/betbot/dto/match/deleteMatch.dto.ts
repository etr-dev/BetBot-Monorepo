import { PickType} from '@nestjs/swagger';
import { MatchDto } from '../match.dto';

export class DeleteMatchDto extends PickType(MatchDto, [
  'eventTitle',
  'matchTitle',
] as const) {}
