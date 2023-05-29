import { BetDto } from '@betbot/dto/bet.dto';
import { MatchDto } from '@betbot/dto/match.dto';
import { ApiProperty } from '@nestjs/swagger';

class BetWithMatchInfo {
    @ApiProperty()
    bet: BetDto;

    @ApiProperty()
    match: MatchDto;
}

export class GetBetsResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        type: BetWithMatchInfo,
        isArray: true,
    })
    data: BetWithMatchInfo[];
}
