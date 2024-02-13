import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Say hello to the bot');

export async function execute(interaction) {
  await interaction.reply(`Hello <@${interaction.user.id}>, Welcome to SB Movies.\n🔥 Download Your Favourite Movies For 💯 Free And 🍿 Enjoy it.\n👇 Enter Movie Name 👇`);
}
