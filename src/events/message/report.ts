import Discord, { MessageSelectMenu } from 'discord.js';
import Raven from 'raven';

import { dispositions } from '../../typedefs';

/**
 * Detect when a user includes the @Staff Report ping, generate a report in the
 * specified reports channel.
 */
export default class Report {
  message: Discord.Message;
  reportsChannel: string;
  staffRoleId: string;

  /**
   * @param {Object} message The message object.
   * @param {String} reportsChannel The reports channel ID.
   * @param {String} staffRoleId The staff role ID.
   */
  constructor(
    message: Discord.Message,
    reportsChannel: string,
    staffRoleId: string
  ) {
    this.message = message;
    this.reportsChannel = reportsChannel;
    this.staffRoleId = staffRoleId;
  }

  /**
   * The main function to run.
   */
  async execute() {
    try {
      const { content, author, guild, channel, client, mentions } =
        this.message;

      // Extract roles in message
      const report = mentions.roles.map((role) => role.id);

      // If mentions includes @Staff
      if (report.includes(this.staffRoleId)) {
        const indicator = new Discord.MessageEmbed({
          color: 16645888,
          fields: [
            {
              name: 'Report',
              value: 'Thank you for the report. We will review it shortly.',
              inline: true,
            },
            {
              name: 'Staff Link',
              value: '-',
              inline: true,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL(),
            text: 'Reported',
          },
        });

        const reportMessage = await (<Discord.TextChannel>(
          guild.channels.cache.get(channel.id)
        )).send({
          embeds: [indicator],
        });

        const resolve = new Discord.MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId('report::0')
            .setPlaceholder('Select disposition')
            .addOptions([
              {
                emoji: '<:EverythingIsFine:266216698451853324>',
                label: 'No action',
                value: dispositions.NO_ACTION,
              },
              {
                emoji: '<:PeepoNote:809186638789214290>',
                label: 'Note',
                value: dispositions.NOTE,
              },
              {
                emoji: '<:YellingWoman:809187855804006410>',
                label: 'Verbal warning',
                value: dispositions.VERBAL_WARN,
              },
              {
                emoji: '✍️',
                label: 'Formal warning',
                value: dispositions.FORMAL_WARN,
              },
              {
                emoji: '🙊',
                label: 'Mute',
                value: dispositions.MUTE,
              },
              {
                emoji: '🦶',
                label: 'Kick',
                value: dispositions.KICK,
              },
              {
                emoji: '<:blanketblob:821415890628902953>',
                label: 'Softban',
                value: dispositions.SOFTBAN,
              },
              {
                emoji: '<:feelsbanman:716743099413561426>',
                label: 'Ban',
                value: dispositions.BAN,
              },
            ])
        );

        // Send information to report channel in an embed
        const m = await (<Discord.TextChannel>(
          guild.channels.cache.get(this.reportsChannel)
        )).send({
          components: [resolve],
          embeds: [
            new Discord.MessageEmbed({
              color: 16645888,
              description: '',
              fields: [
                {
                  name: 'Reporter',
                  value: `${author}`,
                  inline: true,
                },
                {
                  name: 'Channel',
                  value: `${channel}`,
                  inline: true,
                },
                {
                  name: 'Offender',
                  value: 'No offender provided.',
                  inline: true,
                },
                {
                  name: 'Message',
                  value: `${content}`,
                },
                {
                  name: 'Jump to report',
                  value: reportMessage.url,
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL(),
                text: 'Created',
              },
            }),
          ],
        });

        indicator.fields[1].value = `[Case](${m.url})`;

        await reportMessage.edit({
          embeds: [indicator],
        });

        this.message.delete();
      }
    } catch (err) {
      console.log(err);
      Raven.captureException(err);
    }
  }
}
