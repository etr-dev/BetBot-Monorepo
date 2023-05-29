import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../../../schemas";

export class CalcStatsResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'COMPLETE';

    @ApiProperty({
        example: '6312f198fab84e025633c4f7'
    })
    data: User;
}