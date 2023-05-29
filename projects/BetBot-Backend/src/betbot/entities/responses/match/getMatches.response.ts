import { MatchDto } from "../../../dto";
import { ApiProperty } from "@nestjs/swagger";
import { MatchDocument } from "../../../../schemas";

export type GetMatchesServiceResponse = MatchDocument[];

export class GetMatchesControllerResponse {
    @ApiProperty({
        example: 'FOUND'
    })
    message: 'FOUND';

    @ApiProperty({
        type: MatchDto,
        isArray: true,
    })
    data: GetMatchesServiceResponse;
}
