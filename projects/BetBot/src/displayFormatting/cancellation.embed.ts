import { EmbedBuilder } from 'discord.js';

export function embedCancellation(title: string, msg: string): EmbedBuilder {
  const embed = new EmbedBuilder().setTitle('🚫 Cancelled.');

  embed.addFields({
    name: `__${title}__`,
    value: msg,
    inline: false,
  });

  return embed;
}
