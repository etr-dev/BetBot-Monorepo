import { PlaceBetDto } from '@betbot-monorepo/betbot-backend';

export class PlaceBetRequest implements PlaceBetDto {
  matchId: string;

  userId: string;

  walletId: string;

  selectedCorner: string;

  wagerOdds: string;

  wagerAmount: number;

  amountToWin: number;

  amountToPayout: number;
}
