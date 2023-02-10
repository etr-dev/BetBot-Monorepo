/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserWalletId, getWallet, GetWalletResponse } from '@apis';
import { CreateUserRequest } from 'src/apis/backendApi/requests';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';
import { logServer } from '@utils/log';

export interface ICreateUserOutput extends ITaskData {
  usersWallet: GetWalletResponse;
}

export async function createUser(input: ITaskData): Promise<ITaskData> {
  logServer('TASK: createUser');

  // Create a new user (or get existing)
  const createUserRequest = new CreateUserRequest(input.interaction);
  const walletRes = await getUserWalletId(createUserRequest);

  // If the user's wallet does not exist fail with error message.
  if (!walletRes) {
    throw new TaskError('Could not find wallet', {
      interaction: input.interaction,
      message: 'Error finding your wallet.',
    });
  }
  const { walletId } = walletRes;
  const usersWallet = await getWallet(walletId);

  // Pass to next task with the userWallet
  return { interaction: input.interaction, usersWallet };
}
