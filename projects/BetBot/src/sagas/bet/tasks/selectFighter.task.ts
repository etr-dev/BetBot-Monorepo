import { choiceMessage } from '@actions';
import { getButtonInteraction } from '@displayFormatting/buttonHelpers';
import { embedCancellation } from '@displayFormatting/cancellation.embed';
import { messageBuilder } from '@displayFormatting/messageBuilder';
import { embedTimeout } from '@displayFormatting/timeout.embed';
import {
  InteractionUpdateOptions,
  MessageComponentInteraction,
} from 'discord.js';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function selectFighter(input: ITaskData): Promise<ITaskData> {
  const interaction: MessageComponentInteraction =
    input.interaction as MessageComponentInteraction;
  const choiceMsg = await interaction.update(
    choiceMessage(
      input.ufcEventResponse,
      input.selectedMatch,
    ) as InteractionUpdateOptions,
  );
  const buttonInteraction = await getButtonInteraction(
    choiceMsg,
    input.interaction.user.id,
  );

  // If the selection times out show timeout error message
  if (!buttonInteraction) {
    throw new TaskError('Cancelled Fighter Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedTimeout(
            'Fighter Selection',
            'You did not make a selection in time, please use /bet to restart.',
          ),
        ],
      }),
    });
  }

  // If the user cancelled show cancellation message
  if (buttonInteraction.customId === 'Cancel') {
    throw new TaskError('Cancelled Fighter Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedCancellation(
            'Fighter Selection',
            'You have cancelled your fighter selection, please use /bet to restart.',
          ),
        ],
      }),
    });
  }

  const selectedCorner = buttonInteraction.customId;
  return { selectedCorner };
}
