import { logServer } from '@utils/log';
import { InteractionReplyOptions } from 'discord.js';
import { ITaskData } from 'src/sagas/framework/task';

export interface IErrorResponse extends ITaskData {
  message: string | InteractionReplyOptions;
}

export async function errorResponse(
  taskInfo: IErrorResponse,
): Promise<ITaskData> {
  logServer('TASK: errorResponse');

  // If there is no interaction to edit do nothing. (used for timeouts)
  if (!taskInfo.interaction) return { ...taskInfo };

  // Reply with a message
  await taskInfo.interaction.reply(taskInfo.message);
  return { ...taskInfo };
}
