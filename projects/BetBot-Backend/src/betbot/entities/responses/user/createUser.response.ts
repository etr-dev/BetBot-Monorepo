import { UserDto } from "../../../dto";
import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "../../../../schemas";

export type CreateUserServiceResponse = UserDocument;

export class CreateUserControllerResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'CREATED' | 'FOUND';

    @ApiProperty({
        type: UserDto
    })
    data: CreateUserServiceResponse;
}