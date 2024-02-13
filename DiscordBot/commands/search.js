import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';

const number = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟"
]

export const data = new SlashCommandBuilder()
  .setName('search')
  .setDescription('Search a movie/series by name')
  .addStringOption(option =>
            option.setName('query')
                .setDescription('Enter the name of the Movie/Series')
                .setRequired(true)
  );

export async function execute(interaction) {
  const query = interaction.options.get('query');

  interaction.deferReply();

  const raw_data = JSON.stringify({
    "query": query.value
  });

  try {
  let res = await axios.post(`${process.env.BACKENDURL}/api/search`, raw_data,
  {
    headers: {
      'Content-Type': 'application/json',
  }});

  const fields = [];

  for (const item of res.data.res) {
    fields.push({ name: item.title, value: item.link });
  }

  const reply = new EmbedBuilder()
    .setColor('#7f00ff')
    .setTitle(`Search Results for "${query.value}"`)
    .addFields(...fields);

  const message = await interaction.channel.send({ embeds: [reply] });

  let num = 0;
  for (let i = 0; i < number.length && i < fields.length; i++) {
      await message.react(number[i]);
  }

  const filter = (reaction, user) => {
    return number.indexOf(reaction.emoji.name) !== -1 && user.id === interaction.user.id;
    // return reaction.emoji.name in number && user.id === interaction.user.id;
  };

  const collector = message.createReactionCollector({ filter, time: 30000 });

  collector.on('collect', async (reaction, user) => {
      const selectedItem = res.data.res.find(item => item.title === reaction.message.embeds[0].fields[number.indexOf(reaction.emoji.name)].name);
      await download(interaction, selectedItem);
      collector.stop();
    });

  collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        console.log('Reaction collector ended due to time.');
      }
    });
  } catch (error) {
      console.log(error);
    await interaction.reply("Some internal error occured");
  }
}

async function download(interaction, item) {
  const raw_data = JSON.stringify({
      "query": item.link
    });

    try {
    let res = await axios.post(`${process.env.BACKENDURL}/api/download`, raw_data,
    {
      headers: {
        'Content-Type': 'application/json',
    }});

    const fields = [];

    for (const item of res.data.res) {
      fields.push({ name: item.title, value: item.link });
    }


    const reply = new EmbedBuilder()
      .setColor('#7f00ff')
      .setTitle(`Downloads for "${item.title}"`)
      .addFields(...fields);

    const message = await interaction.channel.send({ embeds: [reply] });

    interaction.editReply("Done");
    } catch (error) {
      console.log(error);
      await channel.send("Some internal error occured");
    }
}
