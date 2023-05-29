
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { GetWalletByIdControllerResponse } from "../../entities";

export function GetWalletById(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get the wallet of a user by wallet id',
            description: `Endpoint used to get the wallet of a user. Requires the id of the wallet to be passed in as a query param.`,
        }),
        ApiOkResponse({
            description: `The user's wallet`,
            type: GetWalletByIdControllerResponse,
        })
    )
}