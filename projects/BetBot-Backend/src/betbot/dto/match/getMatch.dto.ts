import { PartialType } from '@nestjs/swagger';
import { MatchDto } from '../match.dto';

export class GetMatchDto extends PartialType(MatchDto) {}
