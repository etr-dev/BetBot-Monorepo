import { ApiProperty } from "@nestjs/swagger";
import { UfcEventDto } from "../../dto";

export type AllEventsServiceResponse = UfcEventDto[];

export class AllEventsControllerResponse {
    @ApiProperty({
        type: UfcEventDto,
        isArray: true,
    })
    data: AllEventsServiceResponse;
}