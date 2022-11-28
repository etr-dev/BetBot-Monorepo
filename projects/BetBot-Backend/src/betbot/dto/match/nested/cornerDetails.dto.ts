import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CornerDetailsDto {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  image: string;
}
