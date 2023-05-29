import { UserDto } from "@betbot/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";
import { User, UserDocument } from "../../../../schemas";

export type GetUsersServiceResponse = UserDocument[];

export class GetUsersControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'FOUND';

    @ApiProperty({
        type: UserDto,
        isArray: true,
    })
    data: GetUsersServiceResponse;
}