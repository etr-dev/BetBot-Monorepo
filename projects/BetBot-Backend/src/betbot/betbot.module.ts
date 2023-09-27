import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import {
  betFeature,
  matchFeature,
  userFeature,
  walletFeature,
} from '../schemas';
import { BetController, MatchController, UserController, WalletController } from './controllers';
import { BetbotService } from './services/betbot.service';
import { BetService } from './services/bets.service';
import { MatchService } from './services/match.service';
import { UserService } from './services/user.service';
import { WalletService } from './services/wallet.service';

config({ path: require('find-config')('.env') });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.ATLAS_DB_CONNECT, {
      connectionName: 'BetBot',
    }),
    MongooseModule.forFeature(
      [userFeature, betFeature, walletFeature, matchFeature],
      'BetBot',
    ),
  ],
  controllers: [BetController, MatchController, UserController, WalletController],
  providers: [BetService, UserService, MatchService, WalletService],
})
export class BetbotModule {}
