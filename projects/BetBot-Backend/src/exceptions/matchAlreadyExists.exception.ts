import { ConflictException } from "@nestjs/common";

export class MatchAlreadyExistsException extends ConflictException {
    constructor(matchTitle: string) {
        super(`The match (${matchTitle}) already exists in the DataBase.`);
    }
}