import * as emoji from 'node-emoji';
import * as colors from 'colors/safe';

colors.enable();

export function logServer(message: string, logEmoji = '🤖'): void {
  // eslint-disable-next-line no-param-reassign
  if (!logEmoji) logEmoji = '🤖';

  const current = new Date();
  console.log(
    `${emoji.find(logEmoji).emoji} ${colors.green('BOT')} ${colors.yellow(
      current.toLocaleTimeString(),
    )}:\t${message}`,
  );
}

export function logError(message: string | object, logEmoji = '⛔'): void {
  // eslint-disable-next-line no-param-reassign
  if (!logEmoji) logEmoji = '⛔';

  const current = new Date();
  console.log(
    `${
      emoji.find(logEmoji).emoji +
      colors.red(' ERROR ') +
      colors.red(`${current.toLocaleTimeString()}`)
    }:\t${colors.red(`${message}`)}`,
  );
}

export function logWarning(message: string | object, logEmoji = '⚠️'): void {
  // eslint-disable-next-line no-param-reassign
  if (!logEmoji) logEmoji = '⚠️';

  const current = new Date();
  console.log(
    `${
      emoji.find(logEmoji).emoji +
      colors.yellow('  WARNING ') +
      colors.yellow(`${current.toLocaleTimeString()}`)
    }:\t${colors.yellow(`${message}`)}`,
  );
}
