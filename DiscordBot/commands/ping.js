import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Test commands replies with pong');

export async function execute(interaction) {
  await interaction.reply('Pong!');
}
