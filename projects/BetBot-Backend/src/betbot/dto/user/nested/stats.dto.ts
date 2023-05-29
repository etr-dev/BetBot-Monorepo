import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive } from "class-validator";

export class StatsDto {
    @ApiProperty({
        example: 464.56,
        description: 'The amount of money in the user wallet'
    })
    @IsNumber()
    walletAmount: number = 0;

    @ApiProperty({
        example: 342.78,
        description: 'The all time amount of money won'
    })
    @IsNumber()
    winnings: number = 0;

    @ApiProperty({
        example: 342.78,
        description: 'The number of bets placed where the user won'
    })
    @IsNumber()
    @IsInt()
    wins: number = 0;

    @ApiProperty({
        example: 414,
        description: 'The all time amount of money lost'
    })
    @IsNumber()
    losings: number = 0;

    @ApiProperty({
        example: 16,
        description: 'The number of bets placed where the user lost'
    })
    @IsNumber()
    @IsInt()
    losses: number = 0;

    @ApiProperty({
        example: .48,
        description: 'The percent of bets where the user won (wonBets/totalBets)'
    })
    @IsNumber()
    winPercentage: number = 0;

    @ApiProperty({
        example: 30,
        description: 'The total amount of bets the user has placed'
    })
    @IsNumber()
    @IsInt()
    bets: number = 0;

    @ApiProperty({
        example: 76,
        description: 'The average odds of the bets the user places'
    })
    @IsNumber()
    averageOdds: number = 0;

    @ApiProperty({
        example: -37,
        description: 'The average odds of the bets placed where the user won'
    })
    @IsNumber()
    averageWinningOdds: number = 0;

    @ApiProperty({
        example: 189,
        description: 'The average odds of the bets placed where the user lost'
    })
    @IsNumber()
    averageLosingOdds: number = 0;
}