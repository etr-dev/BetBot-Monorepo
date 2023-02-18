export interface GetUserResponse {
  _id: string;
  userId: string;
  discordGuildIdList: string[];
  name: string;
  walletId: string;
  userBets: {
    activeBets: string[];
    inactiveBets: string[];
  };
  __v: string;
}
