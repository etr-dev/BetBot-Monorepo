import { EmbedBuilder } from 'discord.js';

export function embedTimeout(title: string, msg: string): EmbedBuilder {
  const embed = new EmbedBuilder().setTitle('⏱️ Timeout.');

  embed.addFields({
    name: `__${title}__`,
    value: msg,
    inline: false,
  });

  return embed;
}
