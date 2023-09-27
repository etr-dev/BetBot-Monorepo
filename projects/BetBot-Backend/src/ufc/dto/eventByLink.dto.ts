import { PickType } from '@nestjs/swagger';
import { UfcEventDto } from './event.dto';

export class EventByLinkDto extends PickType(UfcEventDto, ['url'] as const) {}
