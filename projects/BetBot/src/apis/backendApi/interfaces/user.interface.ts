export interface IUser {
  _id: string;
  userId: string;
  discordGuildIdList: string | string[];
  name: string;
  walletId: string;
  userBets: {
    activeBets: string[];
    inactiveBets: string[];
  };
  stats: {
    walletAmount: number;
    winnings: number;
    wins: number;
    losings: number;
    losses: number;
    winPercentage: number;
    bets: number;
    averageOdds: number;
    averageWinningOdds: number;
    averageLosingOdds: number;
  };
  __v: string;
}
