import { ITaskData } from 'src/sagas/framework/task';

export async function showLeaderboardTask(
  input: ITaskData,
): Promise<ITaskData> {
  console.log(input.guildUsers);
  
  return {};
}
