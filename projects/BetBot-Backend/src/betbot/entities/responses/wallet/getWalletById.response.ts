import { WalletDto } from "../../../dto";
import { ApiProperty } from "@nestjs/swagger";
import { WalletDocument } from "../../../../schemas";

export type GetWalletByIdServiceResponse = WalletDocument;
export class GetWalletByIdControllerResponse {
    @ApiProperty({
        example: 'FOUND'
    })
    message: 'FOUND';

    @ApiProperty({
        type: WalletDto
    })
    data: GetWalletByIdServiceResponse;
}