/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUserWalletId, getWallet } from '@apis';
import { ChatInputCommandInteraction } from 'discord.js';
import { CreateUserRequest } from 'src/apis/backendApi/requests';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

type ICreateUserInput = ITaskData;

interface ICreateUserOutput extends ITaskData {
  wallet: GetWalletResponse;
}

async function createUser(
  interaction: ChatInputCommandInteraction,
): Promise<ITaskData> {
  const createUserRequest = new CreateUserRequest(interaction);
  const walletRes = await getUserWalletId(createUserRequest);
  if (!walletRes) {
    throw new TaskError('Could not find wallet', {
      interaction,
      message: 'Error finding your wallet.',
    });
  }
  const { walletId } = walletRes;
  const usersWallet = await getWallet(walletId);

  return { interaction, wallet: usersWallet };
}

async function errorResponse(taskInfo: ITaskData): Promise<ITaskData> {
  await taskInfo.interaction.reply(taskInfo.message);
  return { ...taskInfo };
}
