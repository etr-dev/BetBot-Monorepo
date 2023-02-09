import { green } from 'colors';
import { Colors } from 'discord.js';
import { GetWalletResponse } from '@apis';
import { EmbedBuilder } from '@discordjs/builders';

export function walletEmbed(user, wallet: GetWalletResponse) {
  const embed = new EmbedBuilder()
    .setTitle(`${user.username} WALLET`)
    .setThumbnail(user.avatarURL())
    .setTimestamp(Date.now())
    .setColor(Colors.Green);

  embed.addFields({
    name: `Amount`,
    value: `$${wallet.amount.toFixed(2)}`,
    inline: true,
  });

  embed.addFields({
    name: `Escrow:`,
    value: `$${wallet.escrow.toFixed(2)}`,
    inline: true,
  });

  return embed;
}
