import { ApiOperationOptions } from "@nestjs/swagger";

export interface IApiDescription {
    [key: string]: ApiOperationOptions
}