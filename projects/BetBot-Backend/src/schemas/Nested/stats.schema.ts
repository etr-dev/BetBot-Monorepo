/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Wallet } from '../wallet.schema';

@Schema({ _id: false })
export class Stats extends Document {
  @Prop()
  walletAmount: number = 0;

  @Prop()
  winnings: number = 0;

  @Prop()
  wins: number = 0;

  @Prop()
  losings: number = 0;

  @Prop()
  losses: number = 0;

  @Prop()
  winPercentage: number = 0;

  @Prop()
  bets: number = 0;

  @Prop()
  averageOdds: number = 0;

  @Prop()
  averageWinningOdds: number = 0;

  @Prop()
  averageLosingOdds: number = 0;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
