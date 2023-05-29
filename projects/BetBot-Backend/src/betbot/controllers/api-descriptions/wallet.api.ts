
import { IApiDescription } from "./apiDescription.interface";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { applyIsOptionalDecorator } from "@nestjs/mapped-types";
import { applyDecorators } from '@nestjs/common';
import { WalletDto } from "@betbot/dto/wallet.dto";
import { FindWalletControllerResponse } from "src/betbot/entities";

export function GetWallet(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get the wallet of a user by wallet id',
            description: `Endpoint used to get the wallet of a user. Requires the id of the wallet to be passed in as a query param.`,
        }),
        ApiOkResponse({
            description: `The user's wallet`,
            type: FindWalletControllerResponse,
        })
    )
}