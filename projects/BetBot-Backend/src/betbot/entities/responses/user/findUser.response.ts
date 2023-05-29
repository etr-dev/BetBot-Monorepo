import { UserDto } from "@betbot/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { User, UserDocument } from "../../../../schemas";

export type FindUserServiceResponse = UserDocument[];

export class FindUserControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'FOUND';

    @ApiProperty({
        type: UserDto,
        isArray: true,
    })
    data: FindUserServiceResponse;
}