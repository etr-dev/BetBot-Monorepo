import { BetDto, MatchDto} from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';
import { BetDocument, MatchDocument } from '../../../../schemas';

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