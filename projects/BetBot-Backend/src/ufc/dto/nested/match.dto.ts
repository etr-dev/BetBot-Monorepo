import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UfcMatchInfoDto } from './matchInfo.dto';

export class UfcMatchDto {
  [key: string]: UfcMatchInfoDto;

  @ValidateNested()
  @Type(() => UfcMatchInfoDto)
  @ApiProperty({ 
    description: 'The match/fight taking place at the event',
    type: () => UfcMatchInfoDto 
  })
  @IsOptional()
  "Kai Kara-France vs Amir Albazi"?: UfcMatchInfoDto; // only here for documentation
}