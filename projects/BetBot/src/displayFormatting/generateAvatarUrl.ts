// https://cdn.discordapp.com/avatars/211663642280722433/b43fb0ce92e76b416fcc14cb1c6ebb0d.webp

export const avatarUrl = (guildId: string, avatarId: string): string =>
  `https://cdn.discordapp.com/avatars/${guildId}/${avatarId}.webp`;
