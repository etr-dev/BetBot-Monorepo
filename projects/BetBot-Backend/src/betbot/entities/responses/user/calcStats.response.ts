import { UserDto } from "@betbot/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "../../../../schemas";

export type CalcStatsServiceResponse = UserDocument;

export class CalcStatsControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'COMPLETE';

    @ApiProperty({
        type: UserDto
    })
    data: CalcStatsServiceResponse;
}