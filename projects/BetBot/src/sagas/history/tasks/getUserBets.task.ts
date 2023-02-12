/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUsersBets } from '@apis';
import { GetUsersBetsRequest } from 'src/apis/backendApi/requests';
import { ITaskData } from 'src/sagas/framework/task';

export async function getUserBetsTask(input: ITaskData): Promise<ITaskData> {
  const getUsersBetsRequest: GetUsersBetsRequest = {
    userId: input.interaction.user.id,
    betSelection: input.buttonSelection,
    attachMatchInfo: true,
  };
  const { data } = await getUsersBets(getUsersBetsRequest);
  return { userBets: data };
}