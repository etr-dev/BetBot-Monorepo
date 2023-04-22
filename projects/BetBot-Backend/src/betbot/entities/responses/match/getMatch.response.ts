import { MatchDto } from "@betbot/dto/match.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetMatchResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        type: MatchDto,
        isArray: true,
    })
    data: MatchDto[];
}
