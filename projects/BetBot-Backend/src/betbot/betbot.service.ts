import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { MatchNotFoundException } from 'src/exceptions/matchNotFound.exception';
import { NotEnoughInWalletException } from 'src/exceptions/notEnoughInWallet.exception';
import { CreateUserDto } from './dto/user/createUser.dto';
import { GetUsersBetsDto } from './dto/user/getUsersBets.dto';
import { GetWalletDto } from './dto/wallet/getWallet.dto';
import { CreateMatchDto } from './dto/match/createMatch.dto';
import { GetMatchDto } from './dto/match/getMatch.dto';
import { PlaceBetDto } from './dto/bet/placeBet.dto';
import { BetSelection } from './entities/enums/betSelection.enum';
import { CompleteMatchDto } from './dto/match/completeMatch.dto';
import {
  BetDocument,
  Match,
  MatchDocument,
  UserDocument,
  WalletDocument,
} from 'src/schemas';
import { GetUserDto } from './dto/user/getUser.dto';
import { Stats } from 'src/schemas/Nested/stats.schema';

@Injectable()
export class BetbotService {
  constructor(
    @InjectConnection('BetBot') private connection: Connection,
    @InjectModel('User', 'BetBot') private userModel: Model<UserDocument>,
    @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
    @InjectModel('Match', 'BetBot') private matchModel: Model<MatchDocument>,
    @InjectModel('Bet', 'BetBot') private betModel: Model<BetDocument>,
  ) {}

  //-----------------------------------------------------
  //                DROP USERS
  //-----------------------------------------------------
  async drop() {
    this.connection.db.dropCollection('Users');
  }

  //-----------------------------------------------------
  //                CREATE USER
  //-----------------------------------------------------
  async createUser(createUserDto: CreateUserDto) {
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

      return { message: 'FOUND', walletId: preExistingUser.walletId };
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
    return { message: 'CREATED', walletId: createdUser.walletId };
  }

  //-----------------------------------------------------
  //                FIND USER
  //-----------------------------------------------------
  async findUser(getUserDto: GetUserDto) {
    const data = await this.userModel.find(getUserDto).sort(getUserDto.sort);
    return { message: 'COMPLETE', data };
  }

  //-----------------------------------------------------
  //                CALC USER STATS
  //-----------------------------------------------------
  async calcStats(getUserDto: GetUserDto) {
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
    return { message: 'COMPLETE', data: user };
  }

  //-----------------------------------------------------
  //                GET ALL USERS
  //-----------------------------------------------------
  findAll() {
    return this.userModel.find().exec();
  }

  //-----------------------------------------------------
  //                GET ALL USERS
  //-----------------------------------------------------
  wallet(getWalletDto: GetWalletDto) {
    return this.walletModel.findById(getWalletDto.walletId);
  }

  //-----------------------------------------------------
  //                CREATE MATCH
  //-----------------------------------------------------
  async createMatch(createMatchDto: CreateMatchDto) {
    const preExistingMatch = await this.matchModel.findOne({
      eventTitle: createMatchDto.eventTitle,
      matchTitle: createMatchDto.matchTitle,
    });

    if (preExistingMatch) {
      return { message: 'FOUND', matchId: preExistingMatch._id };
    } else {
      const createdMatch = new this.matchModel(createMatchDto);
      await createdMatch.save();

      return { message: 'CREATED', matchId: createdMatch._id };
    }
  }

  //-----------------------------------------------------
  //                PLACE BET
  //-----------------------------------------------------
  async placeBet(placeBetDto: PlaceBetDto) {
    const preExistingMatch: MatchDocument = await this.matchModel.findOne({
      _id: placeBetDto.matchId,
    });

    if (!preExistingMatch) {
      throw new MatchNotFoundException(placeBetDto.matchId);
    }

    const bet = new this.betModel({ creationDate: Date.now(), ...placeBetDto });

    const user = await this.userModel.findOne({ userId: placeBetDto.userId });
    user.userBets.activeBets.push(bet._id);

    const wallet = await this.walletModel.findById(placeBetDto.walletId);
    if (!wallet) throw new Error('Wallet not found');
    if (placeBetDto.wagerAmount > wallet.amount) {
      throw new NotEnoughInWalletException(
        placeBetDto.wagerAmount,
        wallet.amount,
      );
    }
    wallet.amount -= placeBetDto.wagerAmount;
    wallet.escrow += placeBetDto.wagerAmount;

    const odds = Number(placeBetDto.wagerOdds);
    user.stats.bets += 1;
    // calculate the new average betting odds for the user
    user.stats.averageOdds =
      ((user.stats.bets - 1) * user.stats.averageOdds + odds) / user.stats.bets;

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await wallet.save({ session });
      await bet.save({ session });
      await user.save({ session });
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

    return { message: 'CREATED', betId: bet._id };
  }

  //-----------------------------------------------------
  //                MATCH COMPLETE
  //-----------------------------------------------------
  async completeMatch(completeMatchDto: CompleteMatchDto) {
    const match = await this.matchModel.findOne({
      eventTitle: completeMatchDto.eventTitle,
      matchTitle: completeMatchDto.matchTitle,
    });

    if (!match) {
      throw new MatchNotFoundException(completeMatchDto.matchTitle);
    }

    const betsOnMatch: BetDocument[] = await this.betModel.find({
      matchId: match._id,
    });

    for (const bet of betsOnMatch) {
      const wallet = await this.walletModel.findById(bet.walletId);
      const user = await this.userModel.findOne({ userId: bet.userId });

      const index = user.userBets.activeBets.indexOf(bet._id);
      if (index == -1) {
        // If the bet is not found in activebets
        console.log(`Bet is not active, skipping: ${bet._id}`);
        continue;
      }

      switch (completeMatchDto.postMatchInfo.result) {
        case bet.selectedCorner.toUpperCase():
          bet.outcome = 'WIN';
          wallet.amount += bet.amountToPayout; // Payout money
          wallet.escrow -= bet.wagerAmount;
          break;
        case 'NO_CONTEST':
          bet.outcome = 'NO_CONTEST';
          wallet.amount += bet.wagerAmount; // Give money back
          wallet.escrow -= bet.wagerAmount;
          break;
        case 'DRAW':
          bet.outcome = 'DRAW';
          wallet.escrow -= bet.wagerAmount; // take money out of escrow
          break;
        default: // take money out of escrow
          bet.outcome = 'LOSS';
          wallet.escrow -= bet.wagerAmount;
          break;
      }
      bet.completionDate = Date.now();

      user.userBets.activeBets.splice(index, 1);
      user.userBets.inactiveBets.push(bet._id);

      user.stats = this.updateUserStats(user.stats, bet);
      await bet.save();
      await user.save();
      await wallet.save();
    }

    await match.updateOne({
      $set: {
        postMatchInfo: completeMatchDto.postMatchInfo,
        isComplete: true,
      },
    });
    return { message: 'COMPLETE', betId: betsOnMatch.map((bet) => bet._id) };
  }

  async getUsersBets(getUsersBetsDto: GetUsersBetsDto) {
    const { userId, betSelection, attachMatchInfo } = getUsersBetsDto;

    const user = await this.userModel.findOne({ userId });
    let betIdList = [];

    switch (betSelection) {
      case BetSelection.ACTIVE:
        betIdList = user.userBets.activeBets;
        break;
      case BetSelection.INACTIVE:
        betIdList = user.userBets.inactiveBets;
        break;
      case BetSelection.ALL:
        betIdList = user.userBets.activeBets;
        betIdList = betIdList.concat(user.userBets.inactiveBets);
    }

    const bets = await this.betModel.find({
      _id: { $in: betIdList },
    });

    //   var data = bets.map(function (bet) {
    //     return [bet, bet.matchId]
    // });

    const matchMapById = {};

    for (const bet of bets) {
      const matchId: string = bet.matchId.toString();
      if (!(matchId in matchMapById)) {
        matchMapById[matchId] = await this.matchModel.findById(matchId);
      }
    }

    // Sort most recent at index 0 by creation date
    bets.sort((a, b) => b.creationDate - a.creationDate);
    let data;
    if (attachMatchInfo) {
      data = bets.map(function (bet) {
        const obj = {
          bet: bet,
          match: matchMapById[bet.matchId.toString()],
        };
        return obj;
      });
    } else {
      data = bets;
    }

    return { message: 'COMPLETE', data: data };
  }

  async getAllIncompleteMatchLinks() {
    const matches = await this.matchModel.find({
      isComplete: false,
    });

    const matchLinks = matches.map((match) => {
      const link = match.link;
      return link;
      // return link.substring(0, link.indexOf('#'));
    });

    return { message: 'COMPLETE', data: [...new Set(matchLinks)] };
  }

  async getMatch(query: GetMatchDto) {
    const matches = await this.matchModel.find(query);

    return { message: 'COMPLETE', data: matches };
  }

  private updateUserStats(stats: Stats, bet: BetDocument) {
    const odds = Number(bet.wagerOdds);
    switch (bet.outcome) {
      case 'WIN':
        stats.winnings += bet.amountToWin;
        stats.wins += 1;
        stats.averageWinningOdds =
          ((stats.wins - 1) * stats.averageWinningOdds + odds) / stats.wins;
        break;
      case 'DRAW':
        stats.losings -= bet.wagerAmount;
        stats.losses += 1; // This will change once allow people to bet draw
        stats.averageLosingOdds =
          ((stats.losses - 1) * stats.averageLosingOdds + odds) / stats.losses;
        break;
      case 'LOSS': // take money out of escrow
        stats.losings += bet.wagerAmount;
        stats.losses += 1;
        stats.averageLosingOdds =
          ((stats.losses - 1) * stats.averageLosingOdds + odds) / stats.losses;
        break;
    }
    // Calculate win percentage
    stats.winPercentage = stats.wins / (stats.wins + stats.losses);
    stats = this.roundUserStats(stats);

    return stats;
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

/*
      const existingUser = await this.userModel.findOne({ userId: createUserDto.userId });
      if (existingUser.discordGuildIdList.includes(createUserDto.discordGuildId)) {
        return 'User already exists.';
      }
      else {
        existingUser.discordGuildIdList.push(createUserDto.discordGuildId);
        existingUser.save();
        return 'User already exists but new guild was added.'
      }
      */
