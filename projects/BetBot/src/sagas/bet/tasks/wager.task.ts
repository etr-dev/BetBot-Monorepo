import { wagerModal } from '@actions';
import { Wager } from '@classes';
import { getModalResponse } from '@displayFormatting/modal.helpers';
import { logServer } from '@utils/log';
import { CommandInteraction, ModalSubmitInteraction } from 'discord.js';
import { TaskError } from 'src/sagas/framework/error';
import { ITaskData } from 'src/sagas/framework/task';

export async function wagerTask(input: ITaskData): Promise<ITaskData> {
  // Show the wager modal on the interaction
  const commandInteraction = input.interaction as CommandInteraction;
  await commandInteraction.showModal(wagerModal());
  const modalResponseInteraction: ModalSubmitInteraction =
    await getModalResponse(input.interaction);

  // If there is no response fail with timeout
  if (!modalResponseInteraction) {
    throw new TaskError('Wager Modal Timed Out.', {action: 'NOTHING'});
  }

  // Get the wager number from the modal and validate the wager
  const wager = modalResponseInteraction.fields.getTextInputValue('wagerInput');
  const wagerClass: Wager = new Wager(wager, input.usersWallet.amount);
  if (!(await wagerClass.validate())) {
    throw new TaskError('Invalid Wager.', {
      interaction: modalResponseInteraction,
      message: wagerClass.generateErrorMessage(),
    });
  }

  // Continue to next step
  return {
    interaction: modalResponseInteraction,
    wager,
    wagerClass,
  };
}
