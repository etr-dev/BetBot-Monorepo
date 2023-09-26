import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetBetsControllerResponse, PlaceBetControllerResponse } from '../../entities';

export function PlaceBet(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Place a bet',
            description: `
            Endpoint used to place a bet. Will attach the bet to active bets under the
            user who placed it and remove the amount from their wallet. 
            `,
        }),
        ApiOkResponse({
            description: `Successful bet 2.`,
            type: PlaceBetControllerResponse,
        })
    )
}

export function GetBets(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get bets that user has placed.',
            description: `
            Endpoint used to place a bet. Will attach the bet to active bets under the
            user who placed it and remove the amount from their wallet. 
            `,
        }),
        ApiOkResponse({
            description: `Successful list of bets - no match info.`,
            type: GetBetsControllerResponse,
        }),
    )
}