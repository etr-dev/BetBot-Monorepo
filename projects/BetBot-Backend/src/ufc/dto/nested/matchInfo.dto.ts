import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UfcFighterInfoDto } from "./fighterInfo.dto";
import { UfcMatchDetailsDto } from "./matchDetails.dto";


export class UfcMatchInfoDto {
  @ValidateNested()
  @Type(() => UfcMatchDetailsDto)
  @ApiProperty({ 
    description: 'Details about the match',
    type: () => UfcMatchDetailsDto
  })
  details: UfcMatchDetailsDto;

  @ValidateNested()
  @Type(() => UfcFighterInfoDto)
  @ApiProperty({ 
    description: 'Information about the fighter in the Red Corner',
    type: () => UfcFighterInfoDto 
  })
  Red: UfcFighterInfoDto;

  @ValidateNested()
  @Type(() => UfcFighterInfoDto)
  @ApiProperty({ 
    description: 'Information about the fighter in the Blue Corner',
    type: () => UfcFighterInfoDto 
  })
  Blue: UfcFighterInfoDto;
}
