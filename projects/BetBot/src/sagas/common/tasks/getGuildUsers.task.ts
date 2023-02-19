import { getUser } from '@apis';
import { ITaskData } from 'src/sagas/framework/task';

export async function getUsersInGuild(input: ITaskData): Promise<ITaskData> {
  const discordGuildId = input.interaction.guildId;
  const { data } = await getUser({ discordGuildIdList: discordGuildId });
  if (!data) console.log('Throw an error here');
  return { guildUsers: data };
}
