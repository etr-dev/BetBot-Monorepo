import { GetUsersBetsDto } from '@betbot-monorepo/betbot-backend';
import { BetSelection } from './enums/betSelection.enum';

export class GetUsersBetsRequest implements GetUsersBetsDto {
  userId: string;

  betSelection: BetSelection;

  attachMatchInfo: boolean;
}
