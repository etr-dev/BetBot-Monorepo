import { ButtonInteraction, ComponentType } from 'discord.js';
import { logError } from '../utils';

export async function getButtonInteraction(
  messageWithButtons,
  orginalUserId,
  timeout = 10000,
): Promise<ButtonInteraction> {
  const filter = (i): boolean => {
    i.deferUpdate();
    return i.user.id === orginalUserId;
  };

  return messageWithButtons
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.Button,
      time: timeout,
    })
    .then((interaction) => interaction)
    .catch((err) => {
      logError(err);
      return undefined;
    });
}
