import {
  ComponentType,
  Message,
  SelectMenuComponentOptionData,
  User,
} from 'discord.js';
import { logServer } from '../utils';
import { selectResponseTime } from '../utils/constants';

export function listToSelectOptions(inputList, includeCancel = false) {
  const selectList: SelectMenuComponentOptionData[] = [];
  let count = 1;
  for (const item of inputList) {
    const selectOption: SelectMenuComponentOptionData = {
      label: `${count}. ${item}`,
      value: item,
    };
    selectList.push(selectOption);
    count++;
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

export async function getSelectOptionInteraction(selectMsg, originalUserId) {
  const filter = (i) => i.user.id === originalUserId;

  return selectMsg
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.SelectMenu,
      time: selectResponseTime,
    })
    .then((interaction) => interaction)
    .catch((err) => undefined);
}
