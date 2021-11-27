import Discord from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class Ask {
	data: any = new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Send tip letting users know to just ask their question')

  async execute(interaction: Discord.CommandInteraction) {
    const { client, channel } = interaction;

    const tip = new Discord.MessageEmbed({
      color: 1441536,
      title: 'Tip',
      description: 'If you have a question, don\'t hesitate to ask it. To save time, '
      + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: 'Homework Help Bot' 
      }
    })

    channel.send({
      embeds: [tip]
    })
  }
}