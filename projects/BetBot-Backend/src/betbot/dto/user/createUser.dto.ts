import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class CreateUserDto extends PickType(UserDto, [
  'userId',
  'name',
] as const) {
  @IsNumberString()
  @ApiProperty({
    description: 'The discord guild id of the discord server that the user is in.',
    example: '211663642280722433',
  }) 
  discordGuildId: string;
}
