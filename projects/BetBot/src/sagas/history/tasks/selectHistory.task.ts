import { getButtonInteraction } from '@displayFormatting/buttonHelpers';
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
    new ButtonBuilder()
      .setCustomId(BetSelection.ALL)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel(BetSelection.ALL),
    new ButtonBuilder()
      .setCustomId(BetSelection.INACTIVE)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel(BetSelection.INACTIVE),
    new ButtonBuilder()
      .setCustomId(BetSelection.ACTIVE)
      .setStyle(2)
      .setEmoji('⬅️')
      .setLabel(BetSelection.ACTIVE),
    new ButtonBuilder()
      .setCustomId('Cancel')
      .setStyle(2)
      .setLabel('Cancel')
      .setEmoji('🚫'),
  );

  const historySelectionMsg = await input.interaction.editReply({
    content: 'Pick your poison.',
    embeds: [],
    components: [historyButtons as never],
  });

  const res = await getButtonInteraction(
    historySelectionMsg,
    input.interaction.user.id,
    20000,
  );

  if (!res || res.customId === 'Cancel') {
    throw new TaskError('', {});
  }

  return { buttonSelection: res.customId };
}
