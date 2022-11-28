import { PartialType } from '@nestjs/swagger';
import { User } from '@schemas';

export class GetUserDto extends PartialType(User) {}
