/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getUsersBets } from '@apis';
import { getButtonInteraction } from '@displayFormatting/buttonHelpers';
import { embedPlacedBet } from '@displayFormatting/fighterCard.embed';
import { numberToEmoji, spliceIntoChunks } from '@utils/functions';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
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
