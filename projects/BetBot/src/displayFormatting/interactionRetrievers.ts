import {
  ButtonInteraction,
  ComponentType,
  Message,
  MessageComponentInteraction,
  SelectMenuInteraction,
} from 'discord.js';

interface IResponseOptions {
  uuid?: string | undefined;
  deferUpdate?: boolean | undefined;
  deferReply?: boolean | undefined;
  timeout?: number | undefined;
}

function setDefaultOptions(
  options: Partial<IResponseOptions>,
): IResponseOptions {
  const defaultPerson: IResponseOptions = {
    uuid: undefined,
    deferUpdate: false,
    deferReply: false,
    timeout: 20000,
  };
  return { ...defaultPerson, ...options };
}

export async function getButtonInteraction(
  messageWithButtons,
  orginalUserId,
  options?: IResponseOptions,
): Promise<ButtonInteraction> {
  // eslint-disable-next-line no-param-reassign
  options = setDefaultOptions(options);
  const { uuid, deferReply, deferUpdate, timeout } = options;

  const filter = (i: MessageComponentInteraction): boolean => {
    const res =
      i.user.id === orginalUserId &&
      i.isButton() &&
      (uuid ? i.customId.includes(uuid) : true); // If UUID is provided check if it is included in customId

    if (res && deferUpdate) i.deferUpdate();
    if (res && deferReply) i.deferReply();

    return res;
  };

  return messageWithButtons
    .awaitMessageComponent({
      filter,
      componentType: ComponentType.Button,
      time: timeout,
    })
    .then((interaction) => interaction)
    .catch((err) => undefined);
}

export async function getSelectOptionInteraction(
  selectMsg: Message,
  originalUserId,
  options?: IResponseOptions,
): Promise<SelectMenuInteraction> {
  // eslint-disable-next-line no-param-reassign
  options = setDefaultOptions(options);
  const { uuid, deferReply, deferUpdate, timeout } = options;

  const filter = (i: MessageComponentInteraction): boolean => {
    const res =
      i.user.id === originalUserId &&
      i.isStringSelectMenu() &&
      (uuid ? i.customId.includes(uuid) : true); // If UUID is provided check that the customId includes it

    if (res && deferUpdate) i.deferUpdate();
    if (res && deferReply) i.deferUpdate();

    return res;
  };

  return (
    selectMsg
      .awaitMessageComponent({
        filter,
        componentType: ComponentType.StringSelect,
        time: timeout,
      })
      .then((interaction) => interaction)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => undefined)
  );
}
