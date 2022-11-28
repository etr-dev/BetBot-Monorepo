import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { WalletDto } from '../wallet.dto';

export class GetWalletDto {
  @IsString()
  walletId: string;
}
