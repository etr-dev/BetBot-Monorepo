import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserBetsDto {
  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    description: 'A list of bet ids that the user has placed with the current status of inactive.',
    example: ['640a00faf89f0f55c90003f4','640116784143af16477aec95']
  })
  inactiveBets: string[];

  @IsString({ each: true })
  @ApiProperty({
    isArray: true,
    description: 'A list of bet ids that the user has placed with the current status of active.',
    example: ['64000b0c4143af16477ae363','63fbc42cecefcd1c37fc5f19']
  })
  activeBets: string[];
}
