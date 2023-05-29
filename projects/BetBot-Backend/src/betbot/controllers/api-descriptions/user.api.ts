import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CalcStatsControllerResponse, CreateUserControllerResponse, GetUsersControllerResponse } from '../../entities';

export function CreateUser(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a user.',
            description: `
            Endpoint used to create a user in the system. A user will be linked to a discordId.
            The user will always link to the discordId so when attempting to create a user if
            one already exists with that discordId it will return the existing user. 
            `,
        }),
        ApiOkResponse({
            description: `Successful User Creation.`,
            type: CreateUserControllerResponse,
        })
    )
}

export function FindUser(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Get a list of users matching query.',
            description: `
            Endpoint used to retrieve existing users. If multiple users
            match the provided query a list of users are returned. If only one user is found
            a list with count of 1 is returned. 
            `,
        }),
        ApiOkResponse({
            description: `Successful retrieval of user.`,
            type: GetUsersControllerResponse,
        }),
    )
}

export function CalcStats(): MethodDecorator {
    return applyDecorators(
        ApiOperation({
            summary: 'Calculate the stats of a user.',
            description: `
            Endpoint used to recalculate the stats of a user by their discordId. This endpoint
            should only be called when the user's stats are out of sync for some reason. 
            `,
        }),
        ApiOkResponse({
            description: `Succesful stat calculation.`,
            type: CalcStatsControllerResponse,
        }),
    )
}