import { ApiProperty } from "@nestjs/swagger";
import { DeleteResult } from "mongodb";

export type DeleteMatchServiceResponse = DeleteResult;
export class DeleteMatchControllerResponse {
    @ApiProperty({
        example: 'DELETED'
    })
    message: 'DELETED';

    @ApiProperty({
        example: {
            acknowledged: true,
            deletedCount: 1,
        }
    })
    data: DeleteMatchServiceResponse;
}
