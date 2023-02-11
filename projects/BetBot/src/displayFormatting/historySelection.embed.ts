import { Colors, EmbedBuilder } from 'discord.js';

export function embedHistorySelection(): EmbedBuilder {
  const embed = new EmbedBuilder().setTitle('📜 History');

  embed
    .addFields(
      {
        name: `__Previous__`,
        value: 'All of the bets that have been completed and are in the past.',
        inline: false,
      },
      {
        name: `__Upcoming__`,
        value:
          'All of the bets that you have placed that have not been completed yet.',
        inline: false,
      },
    )
    .setColor(Colors.Green);

  return embed;
}
