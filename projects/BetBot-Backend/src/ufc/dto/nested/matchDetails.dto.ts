import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UfcMatchDetailsDto {
    @ApiProperty({
      description: 'The link to the specific match.',
      example: 'https://www.ufc.com/event/ufc-fight-night-june-03-2023#10547',
    })
    @IsString()
    link: string;
  
    @ApiProperty({
      description: 'Is the match currently going on.',
      example: false,
    })
    @IsBoolean()
    isLive: boolean;
  
    @ApiProperty({
      description: 'Has the match already been finished',
      example: true,
    })
    @IsBoolean()
    isComplete: boolean;
  
    @ApiProperty({
      description: 'The result of the match Red, Blue, Draw, No Contest, etc.',
      example: 'Red',
    })
    @IsString()
    result?: string;
  
    @ApiProperty({
      description: 'The method by which the fight was won.',
      example: 'TKO',
    })
    @IsString()
    method: string;
  
    @ApiProperty({
      description: 'The time the round ended in.',
      example: '3:50',
    })
    time: string;
  
    @ApiProperty()
    @IsNumber()
    @ApiProperty({
      description: 'The round the fight ended in.',
      example: 3,
    })
    round: number;
  }
  