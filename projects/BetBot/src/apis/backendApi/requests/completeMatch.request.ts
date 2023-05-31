import {
  CompleteMatchDto,
  PostMatchInfoDto,
  UfcEventDto,
} from '@betbot-monorepo/betbot-backend';

export class CompleteMatchRequest implements CompleteMatchDto {
  constructor(ufcEvent: UfcEventDto, selectedMatch: string) {
    this.eventTitle = ufcEvent.eventTitle;
    this.matchTitle = selectedMatch;

    const match = ufcEvent.fights[selectedMatch];
    const postMatchInfo = {
      result: match.details.result,
      method: match.details.method,
      time: match.details.time,
      round: match.details.round,
      Red: {
        name: match.Red.name,
        odds: match.Red.odds,
        outcome: match.Red.outcome,
      },
      Blue: {
        name: match.Blue.name,
        odds: match.Blue.odds,
        outcome: match.Blue.outcome,
      },
    };

    this.postMatchInfo = postMatchInfo;
  }

  eventTitle: string;

  matchTitle: string;

  postMatchInfo: PostMatchInfoDto;
}
