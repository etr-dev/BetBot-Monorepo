import { WalletDto } from "@betbot/dto/wallet.dto";
import { ApiProperty } from "@nestjs/swagger";
import { WalletDocument } from "../../../../schemas";

export type FindWalletServiceResponse = WalletDocument;
export class FindWalletControllerResponse {
    @ApiProperty({
        example: 'FOUND'
    })
    message: 'FOUND';

    @ApiProperty({
        type: WalletDto
    })
    data: FindWalletServiceResponse;
}