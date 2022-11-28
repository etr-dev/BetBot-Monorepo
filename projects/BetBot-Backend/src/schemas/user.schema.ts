import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, SchemaType } from 'mongoose';
import { Bet } from './bet.schema';
import { UserBets, UserBetsSchema } from './Nested/userBets.schema';
import { Wallet } from './wallet.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
    @Prop({ required: true, index: true, unique: true })
    userId: string;

    @Prop([String])
    discordGuildIdList: string[];

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    walletId: Wallet;

    @Prop({ type: UserBetsSchema })
    userBets: UserBets;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const userFeature = { name: 'User', schema: UserSchema };