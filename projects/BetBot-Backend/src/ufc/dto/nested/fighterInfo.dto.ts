import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Outcomes } from "../../models/enums/outcome.enum";

export class UfcFighterInfoDto {
  @ApiProperty({
    description: 'The name of the fighter',
    example: 'Kai Kara-France'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The betting odds for the fighter.',
    example: '-130'
  })
  @IsString()
  odds: string;

  @ApiProperty({
    description: 'The outcome of the fight for the fighter.',
    example: 'WIN'
  })
  @IsString()
  outcome: Outcomes;

  @ApiProperty({
    description: 'A link to the image of the fighter',
    example: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-03/b50842b9-4daf-4430-b5b9-873506c2501c%252FKARA-FRANCE_KAI_L_12-11.png?itok=dJ2ASHUD'
  })
  @IsString()
  image: string;
}
