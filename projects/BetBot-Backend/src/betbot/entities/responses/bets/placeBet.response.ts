import { BetDto } from '@betbot/dto/bet.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BetDocument } from 'src/schemas';

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