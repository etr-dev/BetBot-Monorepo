import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { Outcome } from '../entities/enums/outcome.enum';

export class BetDto {
  @IsString()
  @ApiProperty({
      description: 'The identifying id of the bet.',
      example:'640a00fafd9f0f55c90003f1',
  })
  _id?: string;

  @IsString()
  @ApiProperty({
      description: 'The identifying id of the match the bet was placed on.',
      example:'640a00faf89f0f55c90003f1',
  })
  matchId: string;

  @IsString()
  @ApiProperty({
    description: 'The identifying id of the user, the same as their discord id.',
    example:'211663642280722433',
  })
  userId: string;

  @IsString()
  @ApiProperty({
    description: 'The identifying id of the wallet.',
    example:'6312f18ffab84e025633c4ee',
  })
  walletId: string;

  @IsInt()
  @ApiProperty({
    description: 'The date that the bet was created, UNIX Timestamp.',
    example:'1678377210748',
  })
  creationDate: number;

  @IsInt()
  @ApiProperty({
    description: 'The date that the bet was completed, UNIX Timestamp.',
    example:'1678586417283',
  })
  completionDate: number;

  @IsEnum(Outcome)
  @ApiProperty({
    description: 'The outcome of the bet. WIN LOSS DRAW or NO_CONTEST',
    enum: Outcome,
    enumName: 'Outcome',
    example: 'LOSS'
  })
  outcome: Outcome = undefined;

  @IsString()
  @ApiProperty({
    description: 'The fighter corner that the bet was placed on, Red or Blue',
    example: 'Red',
  })
  selectedCorner: string;

  @IsString()
  @ApiProperty({
    description: 'The odds of the bet when it was placed',
    example: '-250',
  })
  wagerOdds: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'The amount of money placed for the bet, only positive numbers.',
    example: 100,
  })
  wagerAmount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'The amount of money that the bet will win.',
    example: 40,
  })
  amountToWin: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'The amount of money that the bet will payout, wagerAmount + amountToWin.',
    example: 140,
  })
  amountToPayout: number;
}
