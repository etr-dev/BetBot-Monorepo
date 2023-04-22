import { ApiProperty } from '@nestjs/swagger';

export class PlaceBetResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'CREATED';

    @ApiProperty({
        example: '6312f198fab84e025633c4f7'
    })
    betId: string;
}