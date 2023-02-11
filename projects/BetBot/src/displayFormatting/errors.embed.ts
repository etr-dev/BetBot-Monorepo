import { ValidationError } from 'class-validator';
import { EmbedBuilder } from 'discord.js';

export function embedErrors(error: ValidationError): EmbedBuilder {
  const embed = new EmbedBuilder().setTitle('❌ Validation Checks Failed.');

  const constraints = Object.keys(error.constraints);
  // eslint-disable-next-line no-restricted-syntax
  for (const constraint of constraints) {
    embed.addFields({
      name: `__${constraint}__`,
      value: error.constraints[constraint],
      inline: false,
    });
  }

  return embed;
}
