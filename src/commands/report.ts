require('dotenv-extended').load();
import Discord, { MessageActionRow, MessageButton } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

enum actions {
  RESOLVE_REPORT = 0,
  CANCEL_REPORT = 1
}

export default class Report {
	command: any = new SlashCommandBuilder()
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
    
  async execute(interaction: Discord.CommandInteraction) {
    const { guild, client, user, channelId, options } = interaction;

    await interaction.reply({
      content: 'Thank you for helping keep Homework Help safe. Please contact us via <@575252669443211264> if the incident does not get resolved in a timely manner.',
      ephemeral: true
    })
    
    // Report indicator in channel where report was created
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

    // Send report embed to channel reported in
    const r = await (<Discord.TextChannel>guild.channels
      .cache
      .get(channelId))
      .send({
        content: `<@&${process.env.STAFF_REPORT_ROLE_ID}>`,
        embeds: [report]
      });

    // Embed for staff channel
    const staff = new Discord.MessageEmbed({
      color: 16645888,
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
          value: options.getUser('user') !== null ? `${options.getUser('user')}` : 'No offender provided.',
          inline: true
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

    // Resolve Report button
    const resolve = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('report::0')
					.setLabel('Resolve Report')
					.setStyle('DANGER'),
			);

    // Send staff embed
    const s = await (<Discord.TextChannel>guild.channels
      .cache
      .get(process.env.REPORTS_CHANNEL_ID))
      .send({
        embeds: [staff],
        components: [resolve]
      });

    // Add URL for staff to jump to staff channel
    report.fields[1].value = `[Case](${s.url})`
  
    await r.edit({
      embeds: [report]
    });
  }

  async executeButton(interaction: Discord.ButtonInteraction, id: Number) {
    const { guild, message, user } = interaction;

    await interaction.deferReply();
    
    // Report URL - get channel and message id from url
    const [,,,,, c, m] = message.embeds[0].fields[4].value.split('/');
    
    // Copy embed and edit to reflect resolved
    const reportChannel = await <Discord.TextChannel>(guild.channels.cache.get(c))
    const reportMessage = await reportChannel.messages.fetch(m);
    const reportEmbed = reportMessage.embeds[0];

    if (id === actions.RESOLVE_REPORT) {
      // Modify report embed
      reportEmbed.color = 1441536;
      reportEmbed.fields[0].value = 'A staff member has reviewed your report. If you think there was a mistake, please contact us via <@575252669443211264>.',
      reportEmbed.fields[1].value = `[Case](${message.url})`;
      
      await reportMessage.edit({
        embeds: [reportEmbed]
      });
      
      // Set resolve button to green, set who resolved it. Also add cancel button if there was an error
      const button = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('report::0')
            .setLabel(`${user.username}#${user.discriminator}`)
            .setStyle('SUCCESS')
            .setDisabled(),
          new MessageButton()
            .setCustomId('report::1')
            .setLabel('Cancel')
            .setStyle('SECONDARY')
        );
        
      await message.edit({
        components: [button]
      });

      await interaction.editReply({
        content: 'Report resolved.'
      });
    } else if (id === actions.CANCEL_REPORT) {
      const [username, discriminator] = message.components[0].components[0].label.split('#');

      if (username === user.username && discriminator === user.discriminator) {
        // Modify report embed
        reportEmbed.color = 16645888;
        reportEmbed.fields[0].value = 'Thank you for the report. We will review it shortly.',
        reportEmbed.fields[1].value = `[Case](${message.url})`;
  
        await reportMessage.edit({
          embeds: [reportEmbed]
        });
  
        // Reset buttons to unresolved state
        const button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('report::0')
              .setLabel('Resolve Report')
              .setStyle('DANGER'),
          );
  
        await message.edit({
          components: [button]
        })

        await interaction.editReply({
          content: 'Cancelled resolve.'
        })

      } else {
        await interaction.editReply({
          content: 'You cannot cancel since you are not the resolver!'
        });
      }
    }

    setTimeout(async () => {
      await interaction.deleteReply();
    }, 5000);
  }
}
