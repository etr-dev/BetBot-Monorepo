import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetWalletDto {
  @IsString()
  @ApiProperty({
    description: 'The identifying id of the wallet.',
    example:'6312f18ffab84e025633c4ee',
  })
  walletId: string;
}
