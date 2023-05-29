import { MatchDto } from "@betbot/dto/match.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MatchDocument } from "src/schemas";

export type CreateMatchServiceResponse = MatchDocument;
export class CreateMatchControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'CREATED';

    @ApiProperty({
        example: '640a00fafd9f0f55c90003f1'
    })
    data: CreateMatchServiceResponse['id']
}
