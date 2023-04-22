import { MatchDto } from "@betbot/dto/match.dto";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMatchResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({ type: MatchDto })
    data: MatchDto;
}
