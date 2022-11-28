import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { betFeature, matchFeature, userFeature, walletFeature } from '@schemas';
import { BetbotController } from './betbot.controller';
import { BetbotService } from './betbot.service';

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
  controllers: [BetbotController],
  providers: [BetbotService],
})
export class BetbotModule {}
