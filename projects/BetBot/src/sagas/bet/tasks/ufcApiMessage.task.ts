import { getUpcomingFights } from '@apis';
import { embedWaitMessage } from '@displayFormatting/pleaseWait.embed';
import { logError, logServer } from '@utils/log';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function UfcApiMessage(input: ITaskData): Promise<ITaskData> {
  logServer('TASK: UfcApiMessage');

  await input.interaction.reply({
    content: '',
    embeds: [embedWaitMessage()],
    ephemeral: true,
  });
  const ufcEventResponse = await getUpcomingFights();
  if (!ufcEventResponse) {
    logError('NO API RESPONSE, is server running?');

    // TODO: this should be an EDIT reply message
    throw new TaskError('API ERROR', {
      interaction: input.interaction,
      message:
        'Error retrieving data, try again. This can be caused by the API being asleep.',
    });
  }

  return { ...input, ufcEventResponse };
}
