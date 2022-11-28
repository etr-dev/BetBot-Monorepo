import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Bet } from '../bet.schema';

@Schema({_id: false})
export class UserBets extends Document {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }] })
  activeBets: Bet[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bet' }] })
  inactiveBets: Bet[];
}

export const UserBetsSchema = SchemaFactory.createForClass(UserBets);