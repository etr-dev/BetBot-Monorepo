import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { DeleteResult } from "mongodb";
import { Connection, Model } from "mongoose";
import { MatchNotFoundException } from "src/exceptions/matchNotFound.exception";
import { BetDocument, MatchDocument, UserDocument, WalletDocument } from "src/schemas";
import { Stats } from "src/schemas/Nested/stats.schema";
import { CompleteMatchDto, CreateMatchDto, DeleteMatchByIdDto, DeleteMatchDto, GetMatchDto } from "../dto";
import { CompleteMatchServiceResponse, CreateMatchServiceResponse, DeleteMatchServiceResponse, GetMatchesServiceResponse } from "../entities";

export class MatchService {
    constructor(
      @InjectConnection('BetBot') private connection: Connection,
      @InjectModel('User', 'BetBot') private userModel: Model<UserDocument>,
      @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
      @InjectModel('Match', 'BetBot') private matchModel: Model<MatchDocument>,
      @InjectModel('Bet', 'BetBot') private betModel: Model<BetDocument>,
    ) {}

    async createMatch(createMatchDto: CreateMatchDto): Promise<CreateMatchServiceResponse> {
        const preExistingMatch = await this.matchModel.findOne({
          eventTitle: createMatchDto.eventTitle,
          matchTitle: createMatchDto.matchTitle,
        });
    
        if (preExistingMatch) {
          return preExistingMatch;
        } else {
          const createdMatch = new this.matchModel(createMatchDto);
          await createdMatch.save();

          return createdMatch;
        }
      }

    async completeMatch(completeMatchDto: CompleteMatchDto): Promise<CompleteMatchServiceResponse> {
        const match = await this.matchModel.findOne({
            eventTitle: completeMatchDto.eventTitle,
            matchTitle: completeMatchDto.matchTitle,
        });

        if (!match) {
            throw new MatchNotFoundException(completeMatchDto.matchTitle);
        }

        const betsOnMatch: BetDocument[] = await this.betModel.find({
            matchId: match._id,
        });

        for (const bet of betsOnMatch) {
            const wallet = await this.walletModel.findById(bet.walletId);
            const user = await this.userModel.findOne({ userId: bet.userId });

            const index = user.userBets.activeBets.indexOf(bet._id);
            if (index == -1) {
            // If the bet is not found in activebets
            console.log(`Bet is not active, skipping: ${bet._id}`);
            continue;
            }

            switch (completeMatchDto.postMatchInfo.result) {
            case bet.selectedCorner.toUpperCase():
                bet.outcome = 'WIN';
                wallet.amount += bet.amountToPayout; // Payout money
                wallet.escrow -= bet.wagerAmount;
                break;
            case 'NO_CONTEST':
                bet.outcome = 'NO_CONTEST';
                wallet.amount += bet.wagerAmount; // Give money back
                wallet.escrow -= bet.wagerAmount;
                break;
            case 'DRAW':
                bet.outcome = 'DRAW';
                wallet.escrow -= bet.wagerAmount; // take money out of escrow
                break;
            default: // take money out of escrow
                bet.outcome = 'LOSS';
                wallet.escrow -= bet.wagerAmount;
                break;
            }
            bet.completionDate = Date.now();

            user.userBets.activeBets.splice(index, 1);
            user.userBets.inactiveBets.push(bet._id);
            user.stats.walletAmount = wallet.amount;
            user.stats = this.updateUserStats(user.stats, bet);

            const session = await this.connection.startSession();
            session.startTransaction();
            try {
                await wallet.save({ session });
                await bet.save({ session });
                await user.save({ session });
                await session.commitTransaction();
                session.endSession();
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
                throw error;
            }
        }

        await match.updateOne({
            $set: {
            postMatchInfo: completeMatchDto.postMatchInfo,
            isComplete: true,
            },
        });

        return betsOnMatch.map((bet) => bet._id);   // List of completed betIds
    }

    async getMatch(query: GetMatchDto): Promise<GetMatchesServiceResponse> {
        const matches = await this.matchModel.find(query);
        return matches
    }

    async deleteMatch(deleteMatchDto: DeleteMatchDto | DeleteMatchByIdDto): Promise<DeleteMatchServiceResponse> {
        let deletedDoc: DeleteResult;

        if ('id' in deleteMatchDto) {
            deletedDoc = await this.matchModel.findByIdAndDelete(deleteMatchDto.id);
        } else {
            deletedDoc = await this.matchModel.deleteOne(deleteMatchDto);
        }

        return deletedDoc;
    }


    private updateUserStats(stats: Stats, bet: BetDocument): Stats {
        const odds = Number(bet.wagerOdds);
        switch (bet.outcome) {
            case 'WIN':
                stats.winnings += bet.amountToWin;
                stats.wins += 1;
                stats.averageWinningOdds =
                    ((stats.wins - 1) * stats.averageWinningOdds + odds) / stats.wins;
                break;
            case 'DRAW':
                stats.losings -= bet.wagerAmount;
                stats.losses += 1; // This will change once allow people to bet draw
                stats.averageLosingOdds =
                    ((stats.losses - 1) * stats.averageLosingOdds + odds) / stats.losses;
                break;
            case 'LOSS': // take money out of escrow
                stats.losings += bet.wagerAmount;
                stats.losses += 1;
                stats.averageLosingOdds =
                    ((stats.losses - 1) * stats.averageLosingOdds + odds) / stats.losses;
                break;
        }
        // Calculate win percentage
        stats.winPercentage = stats.wins / (stats.wins + stats.losses);
        stats = this.roundUserStats(stats);

        return stats;
    }


    private roundUserStats(stats: Stats): Stats {
        stats.walletAmount = Number(stats.walletAmount.toFixed(2));
        stats.winnings = Number(stats.winnings.toFixed(2));
        stats.losings = Number(stats.losings.toFixed(2));
        stats.winPercentage = Number(stats.winPercentage.toFixed(2));
        stats.averageOdds = Math.floor(stats.averageOdds);
        stats.averageWinningOdds = Math.floor(stats.averageWinningOdds);
        stats.averageLosingOdds = Math.floor(stats.averageLosingOdds);

        return stats;
    }
}