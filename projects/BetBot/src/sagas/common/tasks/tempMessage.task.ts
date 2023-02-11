import { embedWaitMessage } from '@displayFormatting/pleaseWait.embed';
import { ITaskData } from '../../framework/task';

export async function tempMessageTask(input: ITaskData): Promise<ITaskData> {
  await input.interaction.reply({
    content: '',
    embeds: [embedWaitMessage()],
    ephemeral: true,
  });

  return {};
}
