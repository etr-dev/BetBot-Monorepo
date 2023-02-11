const colors = require('colors/safe');
const emoji = require('node-emoji');

colors.enable();

export function logServer(message: string, logEmoji = '🤖') {
  const current = new Date();
  console.log(
    `${
      emoji.find(logEmoji).emoji +
      colors.green(' SERVER ') +
      colors.yellow(`${current.toLocaleTimeString()}`)
    }:\t` + `${message}`,
  );
}

export function logError(message: string | object, logEmoji = 'no_entry') {
  const current = new Date();
  console.log(
    `${
      emoji.get(logEmoji) +
      colors.red(' ERROR ') +
      colors.red(`${current.toLocaleTimeString()}`)
    }:\t${colors.red(`${message}`)}`,
  );
}

export function logWarning(message: string | object, logEmoji = 'warning') {
  const current = new Date();
  console.log(
    `${
      emoji.get(logEmoji) +
      colors.yellow('  WARNING ') +
      colors.yellow(`${current.toLocaleTimeString()}`)
    }:\t${colors.yellow(`${message}`)}`,
  );
}
