import { ApiProperty } from "@nestjs/swagger";
import { UfcEventDto } from "../../dto";

export type EventByUrlServiceResponse = UfcEventDto;

export class EventByUrlControllerResponse {
    @ApiProperty({
        type: UfcEventDto
    })
    data: EventByUrlServiceResponse;
}