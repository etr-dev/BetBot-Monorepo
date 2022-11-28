import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { Outcome } from "../entities/enums/outcome.enum";

export class BetDto {
    @IsString()
    matchId: string;

    @IsString()
    @ApiProperty({
        description: 'The user\'s discord user id'
    })
    userId: string;

    @IsString()
    walletId: string;

    @IsInt()
    creationDate: number;

    @IsInt()
    completionDate: number;

    @IsEnum(Outcome)
    @ApiProperty({
        description: 'The outcome of the bet. WIN LOSS DRAW or NO_CONTEST',
        enum: Outcome,
        enumName: 'Outcome',
    })
    outcome: Outcome = undefined;
    
    @IsString()
    @ApiProperty({
        description: 'Red or Blue'
    })
    selectedCorner: string;

    @IsString()
    wagerOdds: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    wagerAmount: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToWin: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    amountToPayout: number;
}
