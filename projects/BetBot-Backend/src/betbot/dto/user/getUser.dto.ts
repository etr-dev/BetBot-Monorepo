import { PartialType } from '@nestjs/swagger';
import { User } from 'src/schemas/';

export class GetUserDto extends PartialType(User) {}
