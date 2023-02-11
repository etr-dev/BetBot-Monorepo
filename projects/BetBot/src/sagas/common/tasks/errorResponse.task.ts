import { logError, logServer } from '@utils/log';
import { InteractionReplyOptions } from 'discord.js';
import { ITaskData } from 'src/sagas/framework/task';

export interface IErrorResponse extends ITaskData {
  message: string | InteractionReplyOptions;
  action?: 'EDIT' | 'REPLY';
}

export async function errorResponse(
  taskInfo: IErrorResponse,
): Promise<ITaskData> {
  logServer('TASK: errorResponse');

  // If there is no interaction to edit do nothing. (used for timeouts)
  if (!taskInfo.interaction) return { ...taskInfo };

  // Reply with a message
  switch (taskInfo.action) {
    case 'EDIT':
      await taskInfo.interaction.editReply(taskInfo.message);
      break;
    case 'REPLY':
    default:
      await taskInfo.interaction.reply(taskInfo.message);
  }
  return { ...taskInfo };
}
