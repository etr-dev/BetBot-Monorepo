import { ApiProperty } from "@nestjs/swagger";
import { UfcEventDto } from "../../dto";

export type NextEventServiceResponse = UfcEventDto;

export class NextEventControllerResponse {
    @ApiProperty()
    message: 'COMPLETE';

    @ApiProperty({
        type: UfcEventDto
    })
    data: NextEventServiceResponse;
}