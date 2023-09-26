/* eslint-disable @typescript-eslint/no-unused-vars */
import { createMatch, placeBet } from '@apis';
import {
  CreateMatchRequest,
  PlaceBetRequest,
} from 'src/apis/backendApi/requests';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';
import { embedSelectedFighter } from '@displayFormatting/fighterCard.embed';

export async function placeBetTask(input: ITaskData): Promise<ITaskData> {
  const createMatchRequest = new CreateMatchRequest(
    input.ufcEventResponse,
    input.selectedMatch,
  );
  const matchId = await createMatch(createMatchRequest);
  if (!matchId) {
    throw new TaskError('Match failed to POST', {
      interaction: input.interaction,
      message: 'The match failed to post, report this error.',
    });
  }

  const { wagerClass } = input;
  wagerClass.calculateWagerDetails(
    input.validateUfcBetApiResponse.fights[input.selectedMatch][
      input.selectedCorner
    ].odds,
  );

  // Place bet
  const placeBetRequest: PlaceBetRequest = {
    matchId: matchId.toString(),
    userId: input.interaction.user.id,
    walletId: input.walletId,
    selectedCorner: input.selectedCorner,
    wagerOdds: wagerClass.wagerOdds,
    wagerAmount: wagerClass.amount,
    amountToWin: wagerClass.amountToWin,
    amountToPayout: wagerClass.amountToPayout,
  };

  try {
    const betRes = await placeBet(placeBetRequest);
    if (!betRes) throw new Error('Empty Bet Response.');
  } catch (err) {
    throw new TaskError('The bet failed to place.', {
      interaction: input.interaction,
      message: 'The bet failed to place. Try again.',
    });
  }

  await input.interaction.editReply({
    content: 'Bet Placed!',
    embeds: [embedSelectedFighter(createMatchRequest, placeBetRequest)],
    components: [],
  });

  return { createMatchRequest, placeBetRequest };
}
