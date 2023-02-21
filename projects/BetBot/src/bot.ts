/* eslint-disable no-case-declarations */
import {
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { config } from 'dotenv';
import { checkMatches } from '@actions';
import * as findConfig from 'find-config';
import { sleep } from '@utils/functions';
import { healthCheck } from './apis/healthCheck.api';
import { logServer } from './utils';
import { BetSaga } from './sagas/bet/bet.saga';
import { WalletSaga } from './sagas/wallet/wallet.saga';
import { HistorySaga } from './sagas/history/history.saga';
import { LeaderboardSaga } from './sagas/leaderboard/leaderboard.saga';

config({ path: findConfig('.env') });

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const discordToken = process.env.DISCORD_TOKEN_TESTBOT;
const rest = new REST({ version: '10' }).setToken(discordToken);

async function setSlashCommands(): Promise<void> {
  const commands = [
    {
      name: 'bet',
      description: 'Bet some of your mula on a UFC fight.',
    },
    {
      name: 'history',
      description: 'View your previous bets active and inactive.',
    },
    {
      name: 'wallet',
      description: 'View your money.',
    },
    {
      name: 'leaderboard',
      description: 'View the leaderboard for this discord server.',
    },
  ];
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const commandInteraction: ChatInputCommandInteraction = interaction;
  // eslint-disable-next-line default-case
  switch (commandInteraction.commandName) {
    case 'bet':
      const betSaga = new BetSaga();
      betSaga.setInitialInput({ interaction: commandInteraction });
      betSaga.startSaga();
      break;
    case 'history':
      const historySaga = new HistorySaga();
      historySaga.setInitialInput({ interaction: commandInteraction });
      historySaga.startSaga();
      break;
    case 'wallet':
      const walletSaga = new WalletSaga();
      walletSaga.setInitialInput({ interaction: commandInteraction });
      walletSaga.startSaga();
      break;
    case 'leaderboard':
      const leaderboardSaga = new LeaderboardSaga();
      leaderboardSaga.setInitialInput({ interaction: commandInteraction });
      leaderboardSaga.startSaga();
      break;
  }
});

client.on('ready', async () => {
  let health = false;
  while (!health) {
    // eslint-disable-next-line no-await-in-loop
    health = await healthCheck();
    if (!health) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000 * 20);
    }
  }
  await checkMatches();
  setInterval(checkMatches, 1000 * 60 * 1); // 1000 * 60 seconds * 15 minutes
  logServer(`Logged in as ${client.user.tag}`);
  logServer(`NODE_ENV: ${process.env.NODE_ENV}`);
});

client.login(discordToken);
setSlashCommands();
