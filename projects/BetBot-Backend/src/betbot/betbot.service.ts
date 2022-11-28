import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  BetDocument,
  Match,
  MatchDocument,
  UserDocument,
  WalletDocument,
} from '@schemas';
import mongoose, { Connection, Model } from 'mongoose';
import { BetNotActiveException } from 'src/exceptions/betNotActive.exception';
import { MatchAlreadyExistsException } from 'src/exceptions/matchAlreadyExists.exception';
import { MatchNotFoundException } from 'src/exceptions/matchNotFound.exception';
import { NotEnoughInWalletException } from 'src/exceptions/notEnoughInWallet.exception';
import { UserAlreadyExistsException } from 'src/exceptions/userAlreadyExists.exception';
import { logServer } from 'src/utils/log';
import { CreateUserDto } from './dto/user/createUser.dto';
import { GetUsersBetsDto } from './dto/user/getUsersBets.dto';
import { GetWalletDto } from './dto/wallet/getWallet.dto';
import { CreateMatchDto } from './dto/match/createMatch.dto';
import { GetMatchDto } from './dto/match/getMatch.dto';
import { PlaceBetDto } from './dto/bet/placeBet.dto';
import { BetSelection } from './entities/enums/betSelection.enum';
import { CompleteMatchDto } from './dto/match/completeMatch.dto';
import { assert } from 'console';

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
    });
    createdUser.updateOne({
      $set: {
        userBets: {
          inactiveBets: [],
          activeBets: [],
        },
      },
    })
    createdUser.discordGuildIdList.push(createUserDto.discordGuildId);
    await createdUser.save();
    return { message: 'CREATED', walletId: createdUser.walletId };
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
    const preExistingMatch = await this.matchModel.findOne({
      _id: placeBetDto.matchId,
    });

    if (!preExistingMatch) {
      throw new MatchNotFoundException(placeBetDto.matchId);
    }

    const bet = new this.betModel({ creationDate: Date.now(), ...placeBetDto });

    const user = await this.userModel.findOne({ userId: placeBetDto.userId });
    user.userBets.activeBets.push(bet._id);

    const wallet = await this.walletModel.findById(placeBetDto.walletId);
    if (placeBetDto.wagerAmount > wallet.amount) {
      throw new NotEnoughInWalletException(
        placeBetDto.wagerAmount,
        wallet.amount,
      );
    }
    wallet.amount -= placeBetDto.wagerAmount;
    wallet.escrow += placeBetDto.wagerAmount;
    await wallet.save();
    await bet.save();
    await user.save();

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

    const betsOnMatch = await this.betModel.find({ matchId: match._id });

    for (let bet of betsOnMatch) {
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
      // await this.matchModel.findOneAndUpdate(
      //   {
      //     eventTitle: completeMatchDto.eventTitle,
      //     matchTitle: completeMatchDto.matchTitle,
      //   },
      //   {
      //     $set: {
      //       postMatchInfo: completeMatchDto.postMatchInfo,
      //       isComplete: true,
      //     },
      //   },
      // );
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

    let matchMapById = {};

    for (let bet of bets) {
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
