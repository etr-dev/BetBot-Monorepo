import { ConflictException, NotFoundException } from "@nestjs/common";

export class BetNotActiveException extends NotFoundException {
    constructor(betId: string) {
        super(`The bet (${betId}) is not apart of your active bets, something may be horribly wrong.`);
    }
}