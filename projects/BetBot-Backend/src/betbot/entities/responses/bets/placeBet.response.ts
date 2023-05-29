import { ApiProperty } from '@nestjs/swagger';
import { BetDocument } from '../../../../schemas';

export type PlaceBetsServiceResponse = BetDocument;

export class PlaceBetControllerResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        example: '640a00faf89f0f55c90003f4'
    })
    betId: string;
}