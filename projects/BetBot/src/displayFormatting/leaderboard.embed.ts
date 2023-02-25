import { numberToEmoji } from '@utils/functions';
import { EmbedBuilder, User } from 'discord.js';
import { IUser } from 'src/apis/backendApi/interfaces';

export function embedLeaderboard(
  discordUser: User,
  stats: IUser['stats'],
  position: number,
): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(
      `${numberToEmoji(position)} ${discordUser.username} - $${
        stats.walletAmount
      }`,
    )
    .setThumbnail(discordUser.avatarURL());

  embed.addFields({
    name: `Wins`,
    value: `${stats.wins}`,
    inline: true,
  });

  embed.addFields({
    name: `Winnings`,
    value: `${stats.winnings}`,
    inline: true,
  });

  embed.addFields({
    name: `Avg Win Odds`,
    value: `${stats.averageWinningOdds}`,
    inline: true,
  });

  embed.addFields({
    name: `Losses`,
    value: `${stats.losses}`,
    inline: true,
  });

  embed.addFields({
    name: `Losings`,
    value: `${stats.losings}`,
    inline: true,
  });

  embed.addFields({
    name: `Avg Loss Odds`,
    value: `${stats.averageLosingOdds}`,
    inline: true,
  });

  return embed;
}
