/* eslint-disable no-restricted-syntax */
import {
  ComponentType,
  SelectMenuComponentOptionData,
  SelectMenuInteraction,
} from 'discord.js';
import { selectResponseTime } from '../utils/constants';

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

export async function getSelectOptionInteraction(
  selectMsg,
  originalUserId,
): Promise<SelectMenuInteraction> {
  const filter = (i): boolean => i.user.id === originalUserId;

  return (
    selectMsg
      .awaitMessageComponent({
        filter,
        componentType: ComponentType.SelectMenu,
        time: selectResponseTime,
      })
      .then((interaction) => interaction)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => undefined)
  );
}
