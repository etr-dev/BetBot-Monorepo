import { UserDto } from "../../../dto";
import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "../../../../schemas";

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