import { getEventByUrl } from '@apis';
import { UfcEventDto } from '@betbot-monorepo/betbot-backend';
import { embedValidationMessage } from '@displayFormatting/pleaseWait.embed';
import { logger } from '@utils/baseLogger';
import { MessagePayload } from 'discord.js';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function betValidation(input: ITaskData): Promise<ITaskData> {
  await input.interaction.editReply({
    content: '',
    embeds: [embedValidationMessage()],
    components: [],
    ephemeral: true,
  } as unknown as MessagePayload);

  const validateUfcBetApiResponse: UfcEventDto = await getEventByUrl(
    input.ufcEventResponse.url,
  );
  if (!validateUfcBetApiResponse) {
    logger.error('NO VALIDATION API RESPONSE, is server running?');
    throw new TaskError('', {
      interaction: input.interaction,
      message: 'Error validating UFC Event, try again.',
    });
  }

  if (validateUfcBetApiResponse.fights[input.selectedMatch].details.isLive) {
    throw new TaskError('', {
      interaction: input.interaction,
      message: 'The match is already live.',
    });
  }

  if (
    validateUfcBetApiResponse.fights[input.selectedMatch].details.isComplete
  ) {
    throw new TaskError('', {
      interaction: input.interaction,
      message: 'The match is already over.',
    });
  }

  logger.info('BET VALIDATED.');
  return { validateUfcBetApiResponse };
}
