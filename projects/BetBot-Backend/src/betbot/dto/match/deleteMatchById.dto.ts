import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMatchByIdDto {
  @IsString()
  @ApiProperty({
    description: 'The id of the match',
    example: "640a00faf89f0f55c90003f1",
  }) 
  id: string;
}
