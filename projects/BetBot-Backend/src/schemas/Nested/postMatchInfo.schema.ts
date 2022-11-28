import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Bet } from '../bet.schema';

@Schema({_id: false})
export class PostMatchInfo extends Document {
  @Prop()
  result: string;

  @Prop()
  method: string;

  @Prop()
  time: string;

  @Prop()
  round: number;

  @Prop(raw({
    name: { type: String },
    odds: { type: String },
    outcome: { type: String },
  }))
  Red: Record<string, any>;

  @Prop(raw({
    name: { type: String },
    odds: { type: String },
    outcome: { type: String },
  }))
  Blue: Record<string, any>;
}

export const PostMatchInfoSchema = SchemaFactory.createForClass(PostMatchInfo);