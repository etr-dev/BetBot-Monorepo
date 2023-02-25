/* eslint-disable no-restricted-syntax */
import { SelectMenuComponentOptionData } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function listToSelectOptions(inputList, includeCancel = true) {
  const selectList: SelectMenuComponentOptionData[] = [];
  let count = 1;
  for (const item of inputList) {
    const selectOption: SelectMenuComponentOptionData = {
      label: `${count}. ${item}`,
      value: item,
    };
    selectList.push(selectOption);
    count += 1;
  }

  if (includeCancel) {
    const selectOption: SelectMenuComponentOptionData = {
      label: 'Cancel',
      value: 'Cancel',
      emoji: '🚫',
    };
    selectList.push(selectOption);
  }
  return selectList;
}

// interface IOptionsForSelect {
//   uuid?: string;
//   deferUpdate?: boolean;
//   deferReply?: boolean;
// }

// export async function getSelectOptionInteraction(
//   selectMsg: Message,
//   originalUserId,
//   options?: IOptionsForSelect,
// ): Promise<SelectMenuInteraction> {
//   const filter = (i: MessageComponentInteraction): boolean => {
//     const { uuid, deferUpdate, deferReply } = options || undefined;

//     const res =
//       i.user.id === originalUserId &&
//       i.isSelectMenu() &&
//       (uuid ? i.customId.includes(uuid) : true); // If UUID is provided check that the customId includes it

//     if (res && deferUpdate) i.deferUpdate();
//     if (res && deferReply) i.deferUpdate();

//     return res;
//   };

//   return (
//     selectMsg
//       .awaitMessageComponent({
//         filter,
//         componentType: ComponentType.StringSelect,
//         time: selectResponseTime,
//       })
//       .then((interaction) => interaction)
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       .catch((err) => undefined)
//   );
// }
