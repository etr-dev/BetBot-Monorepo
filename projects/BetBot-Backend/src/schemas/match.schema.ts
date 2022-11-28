import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  PostMatchInfo,
  PostMatchInfoSchema,
} from './Nested/postMatchInfo.schema';
import { UserBets } from './Nested/userBets.schema';

export type MatchDocument = Match & Document;

@Schema({ collection: 'matches' })
export class Match {
  @Prop()
  eventTitle: string;

  @Prop()
  matchTitle: string;

  @Prop()
  link: string;

  @Prop()
  isComplete: boolean = false;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  Red: Record<string, any>;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  Blue: Record<string, any>;

  @Prop({ type: PostMatchInfoSchema })
  postMatchInfo: PostMatchInfo;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
export const matchFeature = { name: 'Match', schema: MatchSchema };
