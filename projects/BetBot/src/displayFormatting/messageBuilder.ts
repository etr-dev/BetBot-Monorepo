import { InteractionReplyOptions } from 'discord.js';

export function messageBuilder(
  content: Partial<InteractionReplyOptions>,
  leaveContent = false,
): InteractionReplyOptions {
  const defaultMessage: InteractionReplyOptions = {
    content: '',
    embeds: [],
    components: [],
    ephemeral: true,
    fetchReply: true,
  };

  if (leaveContent) return { ...content };
  return { ...defaultMessage, ...content };
}
