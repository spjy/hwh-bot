require('dotenv-extended').load();
import Discord from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class Report {
	data: any 
    
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('report')
      .setDescription('Report an incident to a staff member.')
      .addStringOption(
        option =>
        option.setName('details')
          .setDescription('Details describing what you are reporting')
          .setRequired(true)
      )
  }
        
	async execute(interaction) {
    const { guild, client, user, channelId, options } = interaction;

    const report = new Discord.MessageEmbed({
      color: 16645888,
      description: '',
      fields: [
        {
          name: 'Report',
          value: 'Thank you for the report. We will review it shortly.',
          inline: true
        },
        {
          name: 'Info',
          value: '-',
          inline: true
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: 'Homework Help'
      }
    });

    const staff = new Discord.MessageEmbed({
      color: 16645888,
      author: {
        name: 'Report'
      },
      description: '',
      fields: [
        {
          name: 'Reporter',
          value: `${user.id}`,
          inline: true
        },
        {
          name: 'Channel',
          value: `${channelId}`,
          inline: true
        },
        {
          name: 'Message',
          value: `${options.getString('details')}`
        },
        // {
        //   name: 'Jump to report',
        //   value: report.url
        // }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: 'Homework Help'
      }
    })

    const m = await (<Discord.TextChannel>guild.channels
      .cache
      .get(process.env.REPORTS_CHANNEL_ID))
      .send({
        content: 'okosdkf'
      });

		await interaction.reply({ embeds: [report] });
	}
}
