import { logServer } from '@utils/log';
import { ITaskData } from 'src/sagas/framework/task';

// export async function createUser(input: ITaskData): Promise<ITaskData> {
//   logServer('TASK: createUser');

//   const choiceMsg = await input.interaction.update(
//     choiceMessage(ufcEventResponse, selectedMatch),
//   );
//   const buttonInteraction = await getButtonInteraction(
//     choiceMsg,
//     modalResponseInteraction.user.id,
//   );

//   if (!buttonInteraction || buttonInteraction.customId === 'Cancel') {
//     // TODO: Let user know they have cancelled
//     return;
//   }
//   const selectedCorner = buttonInteraction.customId;
// }
