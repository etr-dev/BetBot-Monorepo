import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CornerDetailsDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the fighter.',
    example: "Petr Yan",
  }) 
  name: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'The url to the image of the fighter.',
    example: "https://dmxg5wxfqgb4u.cloudfront.net/styles/event_fight_card_upper_body_of_standing_athlete/s3/2022-10/YAN_PETR_L_10-22.png?itok=3giriBSL",
  }) 
  image: string;
}
