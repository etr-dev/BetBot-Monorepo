/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getButtonInteraction } from '@displayFormatting/buttonHelpers';
import { embedPlacedBet } from '@displayFormatting/fighterCard.embed';
import { numberToEmoji, spliceIntoChunks } from '@utils/functions';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
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

  const historyIsActive = true;
  const pages = spliceIntoChunks(historyEmbeds, 5);
  let selectedPage = 0;
  while (historyIsActive) {
    const back = selectedPage - 1;
    const next = selectedPage + 1;
    const disableBack = back < 0;
    const disableNext = next === pages.length;

    const pageButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`${back}`)
        .setStyle(2)
        .setEmoji('⬅️')
        .setDisabled(disableBack),
      new ButtonBuilder()
        .setCustomId(`${next}`)
        .setStyle(2)
        .setEmoji('➡️')
        .setDisabled(disableNext),
      new ButtonBuilder()
        .setCustomId('Cancel')
        .setStyle(2)
        .setLabel('Cancel')
        .setEmoji('🚫'),
      new ButtonBuilder()
        .setCustomId(`Page`)
        .setStyle(2)
        .setEmoji(selectedPage < 9 ? numberToEmoji(selectedPage + 1) : '☢️')
        .setDisabled(true),
    );

    const pageSelectorMsg = await input.interaction.editReply({
      content: `Page ${numberToEmoji(selectedPage + 1)}:`,
      embeds: pages[selectedPage],
      components: [pageButtons as never],
    });

    const res = await getButtonInteraction(
      pageSelectorMsg,
      input.interaction.user.id,
      20000,
    );

    if (!res) {
      const disabledButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${back}`)
          .setStyle(2)
          .setEmoji('⬅️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`${next}`)
          .setStyle(2)
          .setEmoji('➡️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('Cancel')
          .setStyle(2)
          .setLabel('Timed out')
          .setEmoji('⏱️')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`Page`)
          .setStyle(2)
          .setEmoji(numberToEmoji(selectedPage + 1))
          .setDisabled(true),
      );

      input.interaction.editReply({
        content: 'Response Timed out do /history again to select a new page.',
        components: [disabledButtons as never],
      });
      return;
    }
    if (res.customId === 'Cancel') {
      input.interaction.editReply({
        content: 'Cancelled',
        embeds: [],
        components: [],
      });
      return;
    }

    selectedPage = Number(res.customId);
  }
}
