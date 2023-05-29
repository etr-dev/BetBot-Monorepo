import { BetDto } from '@betbot/dto/bet.dto';
import { MatchDto } from '@betbot/dto/match.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Bet, BetDocument, Match, MatchDocument } from 'src/schemas';

class BetWithMatchInfo {
    @ApiProperty({
        type: BetDto
    })
    bet: BetDocument;

    @ApiProperty({
        type: MatchDto
    })
    match: MatchDocument;
}
export type GetBetsServiceResponse = BetWithMatchInfo[];

export class GetBetsControllerResponse {
    @ApiProperty({
        example: 'COMPLETE'
    })
    message: 'COMPLETE';

    @ApiProperty({
        type: BetWithMatchInfo,
        isArray: true,
    })
    bets: GetBetsServiceResponse;
}