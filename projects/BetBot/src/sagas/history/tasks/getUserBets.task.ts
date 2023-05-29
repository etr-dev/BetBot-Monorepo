/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUsersBets } from '@apis';
import { embedCancellation } from '@displayFormatting/cancellation.embed';
import { messageBuilder } from '@displayFormatting/messageBuilder';
import { GetUsersBetsRequest } from 'src/apis/backendApi/requests';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function getUserBetsTask(input: ITaskData): Promise<ITaskData> {
  const getUsersBetsRequest: GetUsersBetsRequest = {
    userId: input.interaction.user.id,
    betSelection: input.buttonSelection,
    attachMatchInfo: true,
  };
  const data = await getUsersBets(getUsersBetsRequest);
  if (!data.length) {
    throw new TaskError('Cancelled History Select.', {
      interaction: input.interaction,
      action: 'EDIT',
      message: messageBuilder({
        embeds: [
          embedCancellation(
            'No Bets',
            'You currently do not have any bets in the selected category, please use /history to restart.',
          ),
        ],
      }),
    });
  }
  return { userBets: data };
}
