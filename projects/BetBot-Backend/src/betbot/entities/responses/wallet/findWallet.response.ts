import { ApiProperty } from "@nestjs/swagger";
import { Wallet } from "../../../../schemas";

export class FindWalletResponse {
    @ApiProperty({
        example: 'FOUND'
    })
    message: 'FOUND';

    @ApiProperty({
        example: {
            amount: 400,
            escrow: 100
          }
    })
    data: Wallet;
}