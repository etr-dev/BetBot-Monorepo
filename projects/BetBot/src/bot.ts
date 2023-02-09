import {
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
} from 'discord.js';
import { config } from 'dotenv';
import {
  checkMatches,
  startBetSaga,
  startHistorySaga,
  startWalletSaga,
} from '@actions';
import { sleep } from '@utils/functions';
import { healthCheck } from './apis/healthCheck.api';
import { logError, logServer, logWarning } from './utils';
import { testingClientId, testingGuildId } from './utils/constants';

config({ path: require('find-config')('.env') });

// Command Code
const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const discordToken = process.env.DISCORD_TOKEN_TESTBOT;
const rest = new REST({ version: '10' }).setToken(discordToken);

(async () => {
  const commands = [
    {
      name: 'bet',
      description: 'bet some of your mula on a UFC fight.',
    },
    {
      name: 'history',
      description: 'View your previous bets active and inactive.',
    },
    {
      name: 'wallet',
      description: 'view your money.',
    },
  ];
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(testingClientId, testingGuildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandInteraction: ChatInputCommandInteraction = interaction;
  switch (commandInteraction.commandName) {
    case 'bet':
      await startBetSaga(commandInteraction);
      break;
    case 'history':
      await startHistorySaga(commandInteraction);
      break;
    case 'wallet':
      await startWalletSaga(commandInteraction);
      break;
  }
});

client.on('ready', async () => {
  let health = false;
  while (!health) {
    health = await healthCheck();
    if (!health) {
      await sleep(1000 * 20);
    }
  }
  await checkMatches();
  setInterval(checkMatches, 1000 * 60 * 1); // 1000 * 60 seconds * 15 minutes
  logServer(`Logged in as ${client.user.tag}`);
  logServer('NODE_ENV:', process.env.NODE_ENV);
});

client.login(discordToken);
