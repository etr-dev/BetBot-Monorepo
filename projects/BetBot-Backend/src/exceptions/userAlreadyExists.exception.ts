import { ConflictException } from "@nestjs/common";

export class UserAlreadyExistsException extends ConflictException {
    constructor(userId: string) {
        super(`The discord userId (${userId}) already exists in the DataBase.`);
    }
}