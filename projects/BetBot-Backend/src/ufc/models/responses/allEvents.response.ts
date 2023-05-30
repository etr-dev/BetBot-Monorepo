import { ApiProperty } from "@nestjs/swagger";
import { UfcEventDto } from "../../dto";

export type AllEventsServiceResponse = UfcEventDto[];

export class AllEventsControllerResponse {
    @ApiProperty()
    message: 'COMPLETE';

    @ApiProperty({
        type: UfcEventDto,
        isArray: true,
    })
    data: AllEventsServiceResponse;
}