import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { MatchNotFoundException } from "src/exceptions/matchNotFound.exception";
import { NotEnoughInWalletException } from "src/exceptions/notEnoughInWallet.exception";
import { BetDocument, MatchDocument, UserDocument, WalletDocument } from "src/schemas";
import { GetUsersBetsDto, PlaceBetDto } from "../dto";
import { BetSelection } from "../entities";
import { PlaceBetsServiceResponse, GetBetsServiceResponse } from "../entities";

export class BetService {
    constructor(
      @InjectConnection('BetBot') private connection: Connection,
      @InjectModel('User', 'BetBot') private userModel: Model<UserDocument>,
      @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
      @InjectModel('Match', 'BetBot') private matchModel: Model<MatchDocument>,
      @InjectModel('Bet', 'BetBot') private betModel: Model<BetDocument>,
    ) {}

    async placeBet(placeBetDto: PlaceBetDto): Promise<PlaceBetsServiceResponse> {
        const preExistingMatch: MatchDocument = await this.matchModel.findOne({
          _id: placeBetDto.matchId,
        });
    
        if (!preExistingMatch) {
          throw new MatchNotFoundException(placeBetDto.matchId);
        }
    
        const bet = new this.betModel({ creationDate: Date.now(), ...placeBetDto });
    
        const user = await this.userModel.findOne({ userId: placeBetDto.userId });
        user.userBets.activeBets.push(bet._id);
    
        const wallet = await this.walletModel.findById(placeBetDto.walletId);
        if (!wallet) throw new Error('Wallet not found');
        if (placeBetDto.wagerAmount > wallet.amount) {
          throw new NotEnoughInWalletException(
            placeBetDto.wagerAmount,
            wallet.amount,
          );
        }
        wallet.amount -= placeBetDto.wagerAmount;
        wallet.escrow += placeBetDto.wagerAmount;
    
        const odds = Number(placeBetDto.wagerOdds);
        user.stats.bets += 1;
        // calculate the new average betting odds for the user
        user.stats.averageOdds =
          ((user.stats.bets - 1) * user.stats.averageOdds + odds) / user.stats.bets;
    
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
    
        return bet;
      }

      async getUsersBets(getUsersBetsDto: GetUsersBetsDto): Promise<GetBetsServiceResponse> 
      {
        const { userId, betSelection, attachMatchInfo } = getUsersBetsDto;
    
        const user = await this.userModel.findOne({ userId });
        let betIdList = [];
    
        switch (betSelection) {
          case BetSelection.ACTIVE:
            betIdList = user.userBets.activeBets;
            break;
          case BetSelection.INACTIVE:
            betIdList = user.userBets.inactiveBets;
            break;
          case BetSelection.ALL:
            betIdList = user.userBets.activeBets;
            betIdList = betIdList.concat(user.userBets.inactiveBets);
        }
    
        const bets = await this.betModel.find({
          _id: { $in: betIdList },
        });
    
        //   var data = bets.map(function (bet) {
        //     return [bet, bet.matchId]
        // });
    
        const matchMapById = {};
    
        for (const bet of bets) {
          const matchId: string = bet.matchId.toString();
          if (!(matchId in matchMapById)) {
            matchMapById[matchId] = await this.matchModel.findById(matchId);
          }
        }
    
        // Sort most recent at index 0 by creation date
        bets.sort((a, b) => b.creationDate - a.creationDate);
        const data: GetBetsServiceResponse = bets.map(function (bet) {
            const obj = {
                bet: bet,
                match: attachMatchInfo ? matchMapById[bet.matchId.toString()] : undefined,
            };
            return obj;
        });
    
        return data;
      }
    }