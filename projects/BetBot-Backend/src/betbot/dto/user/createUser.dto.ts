import { PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class CreateUserDto extends PickType(UserDto, [
  'userId',
  'name',
] as const) {
  @IsNumberString()
  discordGuildId: string;
}
