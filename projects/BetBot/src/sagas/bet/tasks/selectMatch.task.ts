import { matchSelectMenu } from '@actions';
import { getSelectOptionInteraction } from '@displayFormatting/selectOption';
import { logServer } from '@utils/log';
import { UfcEventResponse } from 'src/apis/ufcApi/responses/ufcEvent.response';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

interface ISelectMatchInput extends ITaskData {
  ufcEventResponse: UfcEventResponse;
}

export async function selectMatch(
  input: ISelectMatchInput,
): Promise<ITaskData> {
  logServer('TASK: selectMatch');

  const matchSelectionMsg = await input.interaction.editReply(
    matchSelectMenu(input.ufcEventResponse),
  );

  // Get the match selection response
  const selectedInteraction = await getSelectOptionInteraction(
    matchSelectionMsg,
    input.interaction.user.id,
  );
  if (!selectedInteraction || selectedInteraction.values[0] === 'Cancel') {
    throw new TaskError('Cancelled or Timeout', {});
  }

  const selectedMatch = selectedInteraction.values[0];
  return { ...input, selectedMatch };
}
