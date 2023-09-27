import { ApiProperty } from "@nestjs/swagger";
import { MatchDocument } from "../../../../schemas";

export type CreateMatchServiceResponse = MatchDocument;
export class CreateMatchControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'CREATED';

    @ApiProperty({
        example: '640a00fafd9f0f55c90003f1'
    })
    matchId: CreateMatchServiceResponse['_id']
}
