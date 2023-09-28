import * as emoji from 'node-emoji';
import * as colors from 'colors/safe';
import { config } from 'dotenv';
import * as findConfig from 'find-config';

colors.enable();
config({ path: findConfig('.env') });

enum LogLevel {
  error = 0,
  warn = 1,
  info = 2,
  debug = 3,
  silly = 4,
}

interface LogTheme {
  error?: LogColors;
  warn?: LogColors;
  info?: LogColors;
  http?: LogColors;
  verbose?: LogColors;
  debug?: LogColors;
  silly?: LogColors;
}

interface LogColors {
  logEmoji: string;
  level: (string: string) => string;
  time: (string: string) => string;
  message: (string: string) => string;
  data?: (string: string) => string;
}

interface LogSections {
  level: string;
  time?: string;
  message: string;
  data: any;
  logEmoji?: string;
}

export class BaseLogger {
  logLevel = process.env.LOG_LEVEL || LogLevel.info;

  logTheme: LogTheme;

  constructor() {
    this.logTheme = {
      error: {
        logEmoji: '⛔',
        level: colors.red,
        time: colors.yellow,
        message: colors.red,
      },
      warn: {
        logEmoji: '🚸',
        level: colors.green,
        time: colors.yellow,
        message: colors.yellow,
      },
      info: {
        logEmoji: '🤖',
        level: colors.green,
        time: colors.yellow,
        message: colors.white,
      },
      http: {
        logEmoji: '🌐',
        level: colors.green,
        time: colors.yellow,
        message: colors.white,
      },
      verbose: {
        logEmoji: '📢',
        level: colors.green,
        time: colors.yellow,
        message: colors.white,
      },
      debug: {
        logEmoji: '🐛',
        level: colors.green,
        time: colors.yellow,
        message: colors.white,
      },
      silly: {
        logEmoji: '🤪',
        level: colors.green,
        time: colors.yellow,
        message: colors.white,
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private errorStackToArray(err: Error): string[] | string {
    return err.stack ? err.stack.split('\n') : err.message;
  }

  private log(logSections: LogSections): void {
    const {
      logEmoji,
      level,
      time = new Date().toLocaleTimeString(),
      message,
      data,
    } = logSections;

    const theme: LogColors = this.logTheme[level];

    const msg = `${emoji.find(logEmoji).emoji} ${theme.level(
      level,
    )} ${theme.time(time)}:\t${theme.message(message)}`;

    console.log(msg, data ?? '');
  }

  error(message: string, meta: any = {}): void {
    if (LogLevel[this.logLevel] < LogLevel.error) return;

    const metaclone = {};
    if (meta) {
      Object.entries(meta).forEach(
        ([key, val]: [key: string, val: unknown]) => {
          metaclone[key] =
            val instanceof Error ? this.errorStackToArray(val) : val;
        },
      );
    }

    const level = 'error';
    const { logEmoji } = this.logTheme.error;
    this.log({
      logEmoji,
      level,
      message,
      data: metaclone,
    });
  }

  warn(message: string, meta?: any): void {
    if (LogLevel[this.logLevel] < LogLevel.warn) return;

    const level = 'warn';
    const { logEmoji } = this.logTheme.warn;
    this.log({
      logEmoji,
      level,
      message,
      data: meta,
    });
  }

  info(message: string, meta?: any): void {
    if (LogLevel[this.logLevel] < LogLevel.info) return;

    const level = 'info';
    const { logEmoji } = this.logTheme.info;
    this.log({
      logEmoji,
      level,
      message,
      data: meta,
    });
  }

  debug(message: string, meta?: any): void {
    if (LogLevel[this.logLevel] < LogLevel.debug) return;

    const level = 'debug';
    const { logEmoji } = this.logTheme.debug;
    this.log({
      logEmoji,
      level,
      message,
      data: meta,
    });
  }

  silly(message: string, meta?: any): void {
    if (LogLevel[this.logLevel] < LogLevel.silly) return;

    const level = 'silly';
    const { logEmoji } = this.logTheme.silly;
    this.log({
      logEmoji,
      level,
      message,
      data: meta,
    });
  }
}

export const logger = new BaseLogger();
Object.freeze(logger);
