import { InteractionReplyOptions } from "discord.js";

export function messageBuilder(content: Partial<InteractionReplyOptions>) {

    const defaultMessage: InteractionReplyOptions = {
      content: '',
      embeds: [],
      components: [],
      ephemeral: true,
      fetchReply: true,
    }

    return {...defaultMessage, ...content};
  }