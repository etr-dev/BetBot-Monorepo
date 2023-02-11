import { walletEmbed } from '@displayFormatting/wallet.embed';
import { ITaskData } from '../../framework/task';

export async function showWalletTask(input: ITaskData): Promise<ITaskData> {
  await input.interaction.editReply({
    content: 'WALLET',
    embeds: [walletEmbed(input.interaction.user, input.usersWallet)],
    // ephemeral: true,
  });
  return {};
}
