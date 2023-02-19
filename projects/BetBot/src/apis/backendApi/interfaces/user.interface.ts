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
  __v: string;
}
