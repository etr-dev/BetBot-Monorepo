import { getEventByUrl } from "@apis";
import { embedValidationMessage } from "@displayFormatting/pleaseWait.embed";
import { logError, logServer } from "@utils/log";
import { ChatInputCommandInteraction, CommandInteraction, MessageComponentInteraction, MessagePayload, ModalSubmitInteraction } from "discord.js";
import { UfcEventResponse } from "src/apis/ufcApi/responses/ufcEvent.response";
import { TaskError } from "src/sagas/framework/error";
import { ITaskData, Task } from "src/sagas/framework/task";

export async function betValidation(input: ITaskData): Promise<ITaskData> {
    logServer('TASK: betValidation');
    
  const placingBetMessage = await input.interaction.editReply({
    content: '',
    embeds: [embedValidationMessage()],
    components: [],
    ephemeral: true,
  } as unknown as MessagePayload);
    
  const validateUfcBetApiResponse: UfcEventResponse = await getEventByUrl(
    input.ufcEventResponse.url,
  );
    if (!validateUfcBetApiResponse) {
        logError('NO VALIDATION API RESPONSE, is server running?');
        throw new TaskError('', {interaction: input.interaction, message: 'Error validating UFC Event, try again.'})
  }

  if (validateUfcBetApiResponse.fights[input.selectedMatch].details.isLive) {
    throw new TaskError('', {interaction: input.interaction, message: 'The match is already live.'})
  }

  if (validateUfcBetApiResponse.fights[input.selectedMatch].details.isComplete) {
    throw new TaskError('', {interaction: input.interaction, message: 'The match is already over.'})
  }

  logServer('BET VALIDATED.');
  return { validateUfcBetApiResponse };
}
