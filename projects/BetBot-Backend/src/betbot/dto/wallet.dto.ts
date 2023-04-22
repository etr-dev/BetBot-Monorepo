import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class WalletDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: "The amount of money available to use in the user's wallet. Max decimal places is 2",
    example: 420.69
  })
  amount: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: "The amount of money currently in bet on a match that cannot be used.",
    example: 69.00
  })
  escrow: string;
}
