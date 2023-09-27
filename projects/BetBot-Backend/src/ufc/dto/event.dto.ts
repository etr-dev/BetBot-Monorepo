import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsString, IsUrl, ValidateNested } from "class-validator";
import { UfcMatchDto } from "./nested/match.dto";

export class UfcEventDto {
  @ApiProperty({
    description: "The title of the UFC Event.",
    example: 'UFC Fight Night March 11 2023'
  })
  @IsString()
  eventTitle: string;

  @ApiProperty({
    description: 'The link to the event, not the specific match.',
    example: "https://www.ufc.com/event/ufc-fight-night-june-03-2023",
  })
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'The date event is taking place',
    example: 'Sat, Jun 3 / 7:00 PM MDT'
  })
  @IsString()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'The link to the image for the event.',
    example: "https://dmxg5wxfqgb4u.cloudfront.net/styles/background_image_xl/s3/image/2023-05/060323-ufc-fight-night-kara-france-vs-albazi-EVENT-ART.jpg?h=d1cb525d&itok=ASmts5ut",
  })
  @IsString()
  image: string;

  @ValidateNested()
  @Type(() => UfcMatchDto)
  @ApiProperty({ type: () => UfcMatchDto })
  fights: UfcMatchDto;
}
