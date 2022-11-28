import { Module, CacheModule } from '@nestjs/common';
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
import { UfcModule } from './ufc/ufc.module';
import { BetbotModule } from './betbot/betbot.module';

config({ path: ('../../.env') });
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UfcModule, BetbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
