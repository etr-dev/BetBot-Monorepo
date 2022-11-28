import { BadRequestException } from '@nestjs/common';

export class NotEnoughInWalletException extends BadRequestException {
  constructor(wagerAmount: number, walletAmount: number) {
    super(
      `The wager (${wagerAmount}) is greater than what is in the wallet (${walletAmount}) and cannot be placed.`,
    );
  }
}
