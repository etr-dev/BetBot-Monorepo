import { ConflictException, NotFoundException } from "@nestjs/common";

export class MatchNotFoundException extends NotFoundException {
    constructor(matchId: string) {
        super(`The match (${matchId}) does not exist in the database report this issue if it persists.`);
    }
}