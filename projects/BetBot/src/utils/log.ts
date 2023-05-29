/* eslint-disable no-constructor-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
enum LogLevels {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  SILLY = 4,
}

class Logger {
  logLevel: LogLevels;

  service: string;

  #logger: Logger;

  constructor(service = 'BOT') {
    if (this.#logger) return this.#logger;

    const level = process.env.LOG_LEVEL;
    this.logLevel = level ? LogLevels[process.env.LOG_LEVEL] : LogLevels.INFO;
    this.service = service;
    this.#logger = this;
  }

  error(message: string, data: any = '', logEmoji = '⛔'): void {
    if (this.logLevel < LogLevels.ERROR) return;

    const time = new Date().toLocaleTimeString();
    console.log(
      `${
        emoji.find(logEmoji).emoji + colors.red(' ERROR ') + colors.red(time)
      }:\t${colors.red(`${message}`)}`,
      data,
    );
  }

  warn(message: string, data: any = '', logEmoji = '⚠️'): void {
    if (this.logLevel < LogLevels.WARN) return;

    const time = new Date().toLocaleTimeString();
    console.log(
      `${
        emoji.find(logEmoji).emoji +
        colors.yellow('  WARNING ') +
        colors.yellow(time)
      }:\t${colors.yellow(`${message}`)}`,
      data,
    );
  }

  info(message: string, data: any = '', logEmoji = '🤖'): void {
    if (this.logLevel < LogLevels.INFO) return;

    const time = new Date().toLocaleTimeString();
    console.log(
      `${emoji.find(logEmoji).emoji} ${colors.green(
        this.service,
      )} ${colors.yellow(time)}:\t${message}`,
      data,
    );
  }

  debug(message: string, data: any = '', logEmoji = '🐛'): void {
    if (this.logLevel < LogLevels.DEBUG) return;

    const time = new Date().toLocaleTimeString();
    console.log(
      `${emoji.find(logEmoji).emoji} ${colors.green('DEBUG')} ${colors.yellow(
        time,
      )}:\t${message}`,
      data,
    );
  }
}

export const logger = new Logger();
Object.freeze(logger);
