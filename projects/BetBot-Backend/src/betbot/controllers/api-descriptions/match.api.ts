import { ApiHeader, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { CompleteMatchControllerResponse, CreateMatchControllerResponse, DeleteMatchControllerResponse, GetMatchesControllerResponse } from "../../entities";
export function CreateMatch(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Create UFC Match',
            description: `When a user bets on a match this should be called if the match does not already exist`,
        }),
        ApiOkResponse({
            description: `Created match`,
            type: CreateMatchControllerResponse,
        }),
    )
}

export function GetMatches(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get UFC Match',
            description: `Get a UFC match that matches the body passed into the request.`,
        }),
        ApiOkResponse({
            description: `A list of matches that match input`,
            type: GetMatchesControllerResponse,
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
            type: DeleteMatchControllerResponse,
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
            type: DeleteMatchControllerResponse,
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
            type: CompleteMatchControllerResponse,
        }),
    )
}