/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUser as createUserApi, getWallet } from '@apis';
import { CreateUserRequest } from 'src/apis/backendApi/requests';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function createUser(input: ITaskData): Promise<ITaskData> {
  // Create a new user (or get existing)
  const createUserRequest = new CreateUserRequest(input.interaction);
  const walletRes = await createUserApi(createUserRequest);

  // If the user's wallet does not exist fail with error message.
  if (!walletRes) {
    throw new TaskError('Could not find wallet', {
      interaction: input.interaction,
      message: 'Error finding your wallet.',
    });
  }
  const { walletId } = walletRes;
  const usersWallet = await getWallet({ walletId: walletId.toString() });

  // Pass to next task with the userWallet
  return { interaction: input.interaction, walletId, usersWallet, ...input };
}
