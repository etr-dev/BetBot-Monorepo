import {
  ActionRowBuilder,
  ButtonBuilder,
  InteractionReplyOptions,
} from 'discord.js';
import { numberToEmoji, spliceIntoChunks } from '@utils/functions';

interface IOptions {
  pageLength?: number;
  timeout?: boolean;
  uuid?: string;
}

const addUUID = (uuid: string): string => (uuid ? `|${uuid}` : '');

export function embedsToPages(
  embedList,
  selectedPage: number,
  options?: IOptions,
): InteractionReplyOptions {
  const pageLength = options ? options.pageLength : 5;
  const timeout = options ? options.timeout : false;
  const uuid = options ? options.uuid : undefined;

  // eslint-disable-next-line no-param-reassign
  if (!selectedPage) selectedPage = 0;
  const pages = spliceIntoChunks(embedList, pageLength || 5);

  const back = selectedPage - 1;
  const next = selectedPage + 1;
  const disableBack = back < 0;
  const disableNext = next === pages.length;

  const pageButtons = timeout
    ? // TIMEOUT BUTTONS
      new ActionRowBuilder().addComponents(
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
      )
    : // NORMAL BUTTONS
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`${back}${addUUID(uuid)}`)
          .setStyle(2)
          .setEmoji('⬅️')
          .setDisabled(disableBack),
        new ButtonBuilder()
          .setCustomId(`${next}${addUUID(uuid)}`)
          .setStyle(2)
          .setEmoji('➡️')
          .setDisabled(disableNext),
        new ButtonBuilder()
          .setCustomId(`Cancel${addUUID(uuid)}`)
          .setStyle(2)
          .setLabel(`Cancel`)
          .setEmoji('🚫'),
        new ButtonBuilder()
          .setCustomId(`Page`)
          .setStyle(2)
          .setEmoji(selectedPage < 9 ? numberToEmoji(selectedPage + 1) : '☢️')
          .setDisabled(true),
      );

  return {
    content: `Page ${numberToEmoji(selectedPage + 1)}:`,
    embeds: pages[selectedPage],
    components: [pageButtons as never],
  };
}
