import { ApiHeader } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';

export function SecurityHeader(): MethodDecorator {
    return applyDecorators(
        ApiHeader({
            name: 'x-api-key',
            schema: { type: 'string', default: '{{API_KEY}}'}
        })
    )
}