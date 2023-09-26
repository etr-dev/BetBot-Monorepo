import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CornerInfoDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the fighter.',
    example: "Petr Yan",
  }) 
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The odds for betting on the particular fighter',
    example: "+220",
  }) 
  odds: string;

  @IsString()
  @ApiProperty({
    description: 'The outcome for the fighter, did they win.',
    example: "WIN",
  }) 
  outcome: string;
}
