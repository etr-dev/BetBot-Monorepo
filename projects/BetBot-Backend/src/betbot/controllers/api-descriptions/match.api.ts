import { ApiHeader, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetMatchResponse } from "src/betbot/entities";
import { applyDecorators } from '@nestjs/common';
import { DeleteMatchResponse } from "src/betbot/entities/responses/deleteMatch.response";
import { CompleteMatchResponse } from "src/betbot/entities/responses/completeMatch.response";


export function GetMatch(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get UFC Match',
            description: `Get a UFC match that matches the body passed into the request.`,
        }),
        ApiOkResponse({
            description: `A list of matches that match input`,
            type: GetMatchResponse,
        }),
    )
}

export function DeleteMatch(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete UFC Match',
            description: `Delete a UFC match by Event Title and Match Title.`,
        }),
        ApiOkResponse({
            description: `Delete match info`,
            type: DeleteMatchResponse,
        }),
    )
}

export function DeleteMatchById(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete UFC Match',
            description: `Delete a UFC match by the match id.`,
        }),
        ApiOkResponse({
            description: `Delete match info`,
            type: DeleteMatchResponse,
        }),
    )
}

export function CompleteMatch(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Complete UFC Match',
            description: `After a UFC Match is over this endpoint is called with information to complete the match and finish all bets.`,
        }),
        ApiOkResponse({
            description: `Completed match`,
            type: CompleteMatchResponse,
        }),
    )
}