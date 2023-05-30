import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsUrl } from "class-validator";

export class UfcEvent {
  @ApiProperty()
  @IsString()
  eventTitle: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsString()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  fights: object;
}
