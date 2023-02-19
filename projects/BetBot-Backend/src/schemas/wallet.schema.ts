import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ collection: 'wallets' })
export class Wallet {
  @Prop()
  amount: number;

  @Prop()
  escrow: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
export const walletFeature = { name: 'Wallet', schema: WalletSchema };
