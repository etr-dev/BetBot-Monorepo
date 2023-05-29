import { MatchDto } from "@betbot/dto/match.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MatchDocument } from "src/schemas";

export type GetMatchServiceResponse = MatchDocument[];

export class GetMatchControllerResponse {
    @ApiProperty({
        example: 'FOUND'
    })
    message: 'FOUND';

    @ApiProperty({
        type: MatchDto,
        isArray: true,
    })
    data: GetMatchServiceResponse;
}
