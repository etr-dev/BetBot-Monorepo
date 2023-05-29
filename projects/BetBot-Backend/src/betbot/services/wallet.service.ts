import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { WalletDocument } from "src/schemas";
import { GetWalletDto } from "../dto";
import { FindWalletServiceResponse } from "../entities";

export class WalletService {
    constructor(
      @InjectConnection('BetBot') private connection: Connection,
      @InjectModel('Wallet', 'BetBot') private walletModel: Model<WalletDocument>,
    ) {}

    async findWallet(getWalletDto: GetWalletDto): Promise<FindWalletServiceResponse> {
      const wallet = await this.walletModel.findById(getWalletDto.walletId);
      return wallet;
    }
    }