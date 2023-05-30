import { ApiProperty } from "@nestjs/swagger";
import { UfcEventDto } from "../../dto";

export type EventByUrlServiceResponse = UfcEventDto;

export class EventByUrlControllerResponse {
    @ApiProperty()
    message: 'COMPLETE';

    @ApiProperty({
        type: UfcEventDto
    })
    data: EventByUrlServiceResponse;
}