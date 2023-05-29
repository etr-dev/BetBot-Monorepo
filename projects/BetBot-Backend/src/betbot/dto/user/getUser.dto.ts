import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserDto } from '../user.dto';

export class GetUserDto extends PartialType(UserDto) {
  @IsOptional()
  @ApiProperty({
    description: 'sort by a property',
    example: 'sort[username] = asc',
  })
  sort?: Record<string, 'asc' | 'desc'> = {};
}
