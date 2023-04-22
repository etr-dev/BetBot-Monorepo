import { ApiProperty } from "@nestjs/swagger";

export class CompleteMatchResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({ 
        isArray: true,
        example: ['640a00faf89f0f55c90003f4', '640116784143af16477aec95']
     })
    betId: string[]
}
