import { ApiProperty } from "@nestjs/swagger";
import { BetDocument } from "src/schemas";

export type CompleteMatchServiceResponse = BetDocument['_id'][];

export class CompleteMatchControllerResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({ 
        isArray: true,
        example: ['640a00faf89f0f55c90003f4', '640116784143af16477aec95']
     })
    data: CompleteMatchServiceResponse
}
