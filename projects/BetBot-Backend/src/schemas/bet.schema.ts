import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Match } from './match.schema';
import { UserBets } from './Nested/userBets.schema';
import { User, UserSchema } from './user.schema';
import { Wallet } from './wallet.schema';

export type BetDocument = Bet & Document;

@Schema({ collection: 'bets' })
export class Bet {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Match', index: true })
    matchId: Match;

    @Prop({ type: String, ref: 'User', index: true })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    walletId: Wallet;

    @Prop()
    creationDate: number;

    @Prop()
    completionDate: number;

    @Prop()
    outcome: string;

    @Prop()
    selectedCorner: string;

    @Prop()
    wagerOdds: string;

    @Prop()
    wagerAmount: number;

    @Prop()
    amountToWin: number;

    @Prop()
    amountToPayout: number;
}

export const BetSchema = SchemaFactory.createForClass(Bet);
export const betFeature = { name: 'Bet', schema: BetSchema };