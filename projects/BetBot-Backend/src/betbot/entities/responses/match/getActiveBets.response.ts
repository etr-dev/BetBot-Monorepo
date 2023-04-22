import { BetDto } from '@betbot/dto/bet.dto';
import { MatchDto } from '@betbot/dto/match.dto';
import { ApiProperty } from '@nestjs/swagger';

class BetWithMatchInfo {
    bet: BetDto;
    match: MatchDto;
}

export class GetBetsResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        type: BetDto,
        isArray: true,
    })
    data: BetDto[];
}
