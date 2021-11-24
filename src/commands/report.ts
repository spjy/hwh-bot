require('dotenv-extended').load();
import Discord, { MessageActionRow, MessageButton } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

enum actions {
  RESOLVE_REPORT = 0
}

export default class Report {
	data: any = new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report an incident to a staff member.')
    .addStringOption(
      option => option.setName('details')
      .setDescription('Details describing what you are reporting')
    )
    .addUserOption(
      option => option.setName('user')
      .setDescription('User to be reported')
    );
  permissions: Discord.ApplicationCommandPermissionData[]
    
    async execute(interaction: Discord.CommandInteraction) {
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
            name: 'Staff Link',
            value: '-',
            inline: true
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help'
        }
      });

      await interaction.reply({
        embeds: [report]
      })

      const r = await interaction.fetchReply();
      
      const staff = new Discord.MessageEmbed({
        color: 16645888,
        author: {
          name: 'Report'
        },
        description: '',
        fields: [
          {
            name: 'Reporter',
            value: `<@${user.id}>`,
            inline: true
          },
          {
            name: 'Channel',
            value: `<#${channelId}>`,
            inline: true
          },
          {
            name: 'Offender',
            value: options.getUser('user') !== null ? `${options.getUser('user')}` : 'No offender provided.'
          },
          {
            name: 'Message',
            value: options.getString('details') !== null ? options.getString('details') : 'No details provided.'
          },
          {
            name: 'Jump to report',
            value: r.url,
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help'
        }
      })

    const resolve = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('report::0')
					.setLabel('Resolve Report')
					.setStyle('DANGER'),
			);
      
    const s = await (<Discord.TextChannel>guild.channels
      .cache
      .get(process.env.REPORTS_CHANNEL_ID))
      .send({
        embeds: [staff],
        components: [resolve]
      });

    report.fields[1].value = `[Case](${s.url})`
  
    await interaction.editReply({
      embeds: [report]
    })
  }

  async executeButton(interaction: Discord.ButtonInteraction, id: Number) {
    const { guild, message } = interaction;

    await interaction.reply({
      content: 'Thank you for your hard work!',
      ephemeral: true
    });

    if (id === actions.RESOLVE_REPORT) {
      // Report URL - get channel and message id from url
      const [,,,,, c, m] = message.embeds[0].fields[4].value.split('/');

      // Copy embed and edit to reflect resolved
      const reportChannel = await <Discord.TextChannel>(guild.channels.cache.get(c))
      const reportMessage = await reportChannel.messages.fetch(m);
      const reportEmbed = reportMessage.embeds[0];
      
      // Modify report embed
      reportEmbed.color = 1441536;
      reportEmbed.fields[0].value = 'A staff member has reviewed your report. If you think there was a mistake, please contact us via <@575252669443211264>.',
      reportEmbed.fields[1].value = `[Case](${message.url})`;

      reportMessage.edit({
        embeds: [reportEmbed]
      });

      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('report::0')
            .setLabel(`Resolved by ${interaction.user.username}#${interaction.user.discriminator}`)
            .setStyle('SUCCESS')
            .setDisabled()
        );

      await message.edit({
        components: [button]
      })
    }
  }
}
