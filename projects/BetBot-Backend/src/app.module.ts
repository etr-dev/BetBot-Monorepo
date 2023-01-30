import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UfcModule } from './ufc/ufc.module';
import { BetbotModule } from './betbot/betbot.module';
import { AppController, AppService } from './app';

config({ path: ('../../.env') });
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UfcModule, BetbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
