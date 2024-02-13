import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

import * as ping from './commands/ping.js';
import * as hello from './commands/hello.js';
import * as search from './commands/search.js';

config();

const client = new Client({
  intents: [
    32767,
  ],
});

function readyDiscord() {
  console.log('Connected to Discord as ', client.user.tag);
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await ping.execute(interaction);
  } else if (interaction.commandName === 'hello') {
    await hello.execute(interaction);
  } else if (interaction.commandName === 'search') {
    await search.execute(interaction);
  }
}

client.once(Events.ClientReady, readyDiscord);

client.on(Events.InteractionCreate, handleInteraction);

client.login(process.env.TOKEN);

