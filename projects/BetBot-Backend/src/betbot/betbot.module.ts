import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  betFeature,
  matchFeature,
  userFeature,
  walletFeature,
} from '../schemas';
import { BetController, MatchController, UserController, WalletController } from './controllers';
import { BetbotService } from './services/betbot.service';
import { BetService } from './services/bets.service';

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
  providers: [BetbotService, BetService],
})
export class BetbotModule {}
