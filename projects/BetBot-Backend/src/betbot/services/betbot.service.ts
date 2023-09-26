import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import {
  BetDocument,
  MatchDocument,
  UserDocument,
  WalletDocument,
} from 'src/schemas';
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
  //                GET ALL USERS
  //-----------------------------------------------------
  findAll() {
    return this.userModel.find().exec();
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
