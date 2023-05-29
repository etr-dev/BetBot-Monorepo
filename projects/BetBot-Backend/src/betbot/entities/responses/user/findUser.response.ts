import { ApiProperty } from "@nestjs/swagger";
import { User, UserDocument } from "../../../../schemas";

export class FindUserResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'FOUND';

    @ApiProperty({
        example: '6312f198fab84e025633c4f7'
    })
    data: UserDocument[];
}