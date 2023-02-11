import { matchSelectMenu } from '@actions';
import { embedCancellation } from '@displayFormatting/cancellation.embed';
import { messageBuilder } from '@displayFormatting/messageBuilder';
import { getSelectOptionInteraction } from '@displayFormatting/selectOption';
import { embedTimeout } from '@displayFormatting/timeout.embed';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function selectMatch(input: ITaskData): Promise<ITaskData> {
  const matchSelectionMsg = await input.interaction.editReply(
    matchSelectMenu(input.ufcEventResponse),
  );

  // Get the match selection response
  const selectedInteraction = await getSelectOptionInteraction(
    matchSelectionMsg,
    input.interaction.user.id,
  );

  if (!selectedInteraction) {
    throw new TaskError('Cancelled Fighter Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedTimeout(
            'Match Selection',
            'You did not make a selection in time, please use /bet to restart.',
          ),
        ],
      }),
    });
  }

  if (selectedInteraction.values[0] === 'Cancel') {
    throw new TaskError('Cancelled Match Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedCancellation(
            'Match Selection',
            'You have cancelled your match selection, please use /bet to restart.',
          ),
        ],
      }),
    });
  }

  const selectedMatch = selectedInteraction.values[0];
  return { interaction: selectedInteraction, selectedMatch };
}
