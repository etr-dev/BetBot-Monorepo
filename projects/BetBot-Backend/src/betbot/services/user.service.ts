import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { BetDocument, MatchDocument, UserDocument, WalletDocument } from "src/schemas";
import { Stats } from "src/schemas/Nested/stats.schema";
import { CreateUserDto, GetUserDto } from "../dto";
import { CalcStatsServiceResponse, CreateUserServiceResponse, FindUserServiceResponse } from "../entities";

export class UserService {
    constructor(
      @InjectConnection('BetBot') private connection: Connection,
      @InjectModel('User', 'BetBot') private userModel: Model<UserDocument>,
      @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
      @InjectModel('Bet', 'BetBot') private betModel: Model<BetDocument>,
    ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserServiceResponse> {
    const preExistingUser = await this.userModel.findOne({
      userId: createUserDto.userId,
    });

    if (preExistingUser) {
      if (
        !preExistingUser.discordGuildIdList.includes(
          createUserDto.discordGuildId,
        )
      ) {
        preExistingUser.discordGuildIdList.push(createUserDto.discordGuildId);
        await preExistingUser.save();
      }

      return preExistingUser;
    }

    const createWallet = new this.walletModel({
      amount: 500,
      escrow: 0,
    });
    const walletId = (await createWallet.save())._id;

    const createdUser = new this.userModel({
      userId: createUserDto.userId,
      discordGuildList: [],
      name: createUserDto.name,
      walletId,
      userBets: {
        inactiveBets: [],
        activeBets: [],
      },
      stats: {
        walletAmount: 500,
        winnings: 0,
        wins: 0,
        losings: 0,
        losses: 0,
        winPercentage: 0,
        bets: 0,
        averageOdds: 0,
        averageWinningOdds: 0,
        averageLosingOdds: 0,
      },
    });
    createdUser.updateOne({
      $set: {
        userBets: {
          inactiveBets: [],
          activeBets: [],
        },
        stats: {
          walletAmount: 500,
          winnings: 0,
          wins: 0,
          losings: 0,
          losses: 0,
          winPercentage: 0,
          bets: 0,
          averageOdds: 0,
          averageWinningOdds: 0,
          averageLosingOdds: 0,
        },
      },
    });
    createdUser.discordGuildIdList.push(createUserDto.discordGuildId);
    await createdUser.save();
    return createdUser;
  }

  async findUser(getUserDto: GetUserDto): Promise<FindUserServiceResponse> {
    const data = await this.userModel.find(getUserDto).sort(getUserDto.sort);
    return data;
  }

  async calcStats(getUserDto: GetUserDto): Promise<CalcStatsServiceResponse> {
    const user = await this.userModel.findOne(getUserDto);
    const wallet = await this.walletModel.findById(user.walletId);
    if (!user) console.log('ERROR');

    const previousBets = await this.betModel.find({
      outcome: { $exists: true },
      userId: user.userId,
    });

    let winningOdds = 0;
    let losingOdds = 0;
    const data: Partial<Stats> = {
      walletAmount: wallet.amount,
      winnings: 0,
      wins: 0,
      losings: 0,
      losses: 0,
      winPercentage: 0,
      bets: previousBets.length,
      averageOdds: 0,
      averageWinningOdds: 0,
      averageLosingOdds: 0,
    };
    for (const bet of previousBets) {
      switch (bet.outcome) {
        case 'WIN':
          data.wins += 1;
          data.winnings += bet.amountToWin;
          winningOdds += Number(bet.wagerOdds);
          break;
        case 'LOSS':
          data.losses += 1;
          data.losings += Number(bet.wagerAmount);
          losingOdds += Number(bet.wagerOdds);
          break;
      }
    }

    if (data.wins || data.losses) {
      data.averageOdds = (winningOdds + losingOdds) / (data.wins + data.losses);
      data.winPercentage = data.wins / (data.losses + data.wins);

      if (data.wins) data.averageWinningOdds = winningOdds / data.wins;
      if (data.losses) data.averageLosingOdds = losingOdds / data.losses;
    }

    user.stats.walletAmount = data.walletAmount;
    user.stats.winnings = data.winnings;
    user.stats.wins = data.wins;
    user.stats.losings = data.losings;
    user.stats.losses = data.losses;
    user.stats.winPercentage = data.winPercentage;
    user.stats.bets = data.bets;
    user.stats.averageOdds = data.averageOdds;
    user.stats.averageWinningOdds = data.averageWinningOdds;
    user.stats.averageLosingOdds = data.averageLosingOdds;

    user.stats = this.roundUserStats(user.stats);

    user.save();
    return user;
  }

  private roundUserStats(stats: Stats): Stats {
    stats.walletAmount = Number(stats.walletAmount.toFixed(2));
    stats.winnings = Number(stats.winnings.toFixed(2));
    stats.losings = Number(stats.losings.toFixed(2));
    stats.winPercentage = Number(stats.winPercentage.toFixed(2));
    stats.averageOdds = Math.floor(stats.averageOdds);
    stats.averageWinningOdds = Math.floor(stats.averageWinningOdds);
    stats.averageLosingOdds = Math.floor(stats.averageLosingOdds);

    return stats;
  }
}