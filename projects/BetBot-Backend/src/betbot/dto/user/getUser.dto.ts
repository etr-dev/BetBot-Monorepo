import { PartialType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class GetUserDto extends PartialType(UserDto) {}
