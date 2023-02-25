/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getButtonInteraction } from '@displayFormatting/buttonHelpers';
import { embedCancellation } from '@displayFormatting/cancellation.embed';
import { embedsToPages } from '@displayFormatting/embedsToPages';
import { embedPlacedBet } from '@displayFormatting/fighterCard.embed';
import { messageBuilder } from '@displayFormatting/messageBuilder';
import { EmbedBuilder } from 'discord.js';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function showHistoryTask(input: ITaskData): Promise<ITaskData> {
  // Create the embed for the history message with the bet data
  const historyEmbeds: EmbedBuilder[] = [];
  let count = 0;
  for (const elem of input.userBets) {
    const { match, bet } = elem;
    historyEmbeds.push(embedPlacedBet(match, bet));
    count += 1;
  }

  const pageSelectorMsg = await input.interaction.editReply(
    embedsToPages(historyEmbeds, input.selectedPage),
  );

  const res = await getButtonInteraction(
    pageSelectorMsg,
    input.interaction.user.id,
  );

  // END CASES:
  // Timeout
  if (!res) {
    throw new TaskError('History Viewing Timeout.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder(
        {
          ...embedsToPages(historyEmbeds, input.selectedPage, {timeout: true}),
          content: 'Response Timed out do /history again to select a new page.',
        },
        true,
      ),
    });
  }

  // Cancel
  if (res.customId === 'Cancel') {
    throw new TaskError('Cancelled History Viewing.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedCancellation(
            'History View',
            'You have stopped viewing your history, please use /history to restart.',
          ),
        ],
      }),
    });
  }

  return { selectedPage: Number(res.customId) };
}
