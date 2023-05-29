import { ApiProperty } from "@nestjs/swagger";
import { Wallet } from "../../../../schemas";

export class CreateUserResponse {
    @ApiProperty({
        example: 'CREATED'
    })
    message: 'CREATED' | 'FOUND';

    @ApiProperty({
        example: '6312f198fab84e025633c4f7'
    })
    walletId: Wallet | string;
}