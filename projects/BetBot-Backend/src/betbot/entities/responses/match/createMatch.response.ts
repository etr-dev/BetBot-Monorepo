import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        example: '64000afb4143af16477ae354',
    })
    matchId: string;
}
