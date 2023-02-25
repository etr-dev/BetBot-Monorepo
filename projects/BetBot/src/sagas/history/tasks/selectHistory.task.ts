import { getButtonInteraction } from '@displayFormatting';
import { embedCancellation } from '@displayFormatting/cancellation.embed';
import { embedHistorySelection } from '@displayFormatting/historySelection.embed';
import { messageBuilder } from '@displayFormatting/messageBuilder';
import { embedTimeout } from '@displayFormatting/timeout.embed';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from '../../framework/task';

export enum BetSelection {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ALL = 'ALL',
}

export async function selectHistoryTask(input: ITaskData): Promise<ITaskData> {
  const historyButtons = new ActionRowBuilder().addComponents(
    // new ButtonBuilder()
    //   .setCustomId(BetSelection.ALL)
    //   .setStyle(2)
    //   // .setEmoji('⬅️')
    //   .setLabel('All'),
    new ButtonBuilder()
      .setCustomId(BetSelection.INACTIVE)
      .setStyle(2)
      .setEmoji('🔙')
      .setLabel('Previous'),
    new ButtonBuilder()
      .setCustomId(BetSelection.ACTIVE)
      .setStyle(2)
      .setEmoji('🔜')
      .setLabel('Upcoming'),
    new ButtonBuilder()
      .setCustomId('Cancel')
      .setStyle(2)
      .setLabel('Cancel')
      .setEmoji('🚫'),
  );

  const historySelectionMsg = await input.interaction.editReply({
    embeds: [embedHistorySelection()],
    components: [historyButtons as never],
  });

  const res = await getButtonInteraction(
    historySelectionMsg,
    input.interaction.user.id,
    { deferUpdate: true },
  );

  if (!res) {
    throw new TaskError('Timeout History Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedTimeout(
            'History Selection',
            'You did not make a selection in time, please use /history to restart.',
          ),
        ],
      }),
    });
  }

  if (res.customId === 'Cancel') {
    throw new TaskError('Cancelled History Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedCancellation(
            'History Selection',
            'You have cancelled your history selection, please use /history to restart.',
          ),
        ],
      }),
    });
  }

  return { buttonSelection: res.customId };
}
