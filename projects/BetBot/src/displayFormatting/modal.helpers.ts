import { ModalSubmitInteraction } from 'discord.js';
import { selectResponseTime } from '../utils/constants';

export async function getModalResponse(
  modalInteraction,
): Promise<ModalSubmitInteraction> {
  const filter = (i): boolean => i.user.id === modalInteraction.user.id;

  return (
    modalInteraction
      .awaitModalSubmit({ filter, time: selectResponseTime })
      .then((interaction) => interaction)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => null)
  );
}
