import { ApiHeader, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetMatchResponse } from "src/betbot/entities";
import { applyDecorators } from '@nestjs/common';


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