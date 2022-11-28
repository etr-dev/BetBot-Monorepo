import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController, AppService } from '@app';
import { betFeature, matchFeature, userFeature, walletFeature } from '@schemas';
import { BetbotService } from './betbot/betbot.service';
import { BetbotController } from './betbot/betbot.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportModule } from '@nestjs/passport';

config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.ATLAS_DB_CONNECT, {
      connectionName: 'BetBot',
    }),
    MongooseModule.forFeature([
      userFeature,
      betFeature,
      walletFeature,
      matchFeature,
    ], 'BetBot'),
    AuthModule,
  ],
  controllers: [AppController, BetbotController],
  providers: [AppService, BetbotService],
})
export class AppModule {}
