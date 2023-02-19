import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserDto } from '../user.dto';

export class GetUserDto extends PartialType(UserDto) {
  @IsOptional()
  sort?: Record<string, 'asc' | 'desc'> = {};
}
