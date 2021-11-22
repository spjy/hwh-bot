import Discord from 'discord.js'
import Raven from 'raven';
import Embed from '../../embed';

/**
 * Detect when a user includes the @Staff ping, generate a report in the
 * specified reports channel.
 */
export default class Report {
  message: Discord.Message
  reportsChannel: string
  staffRoleId: string

  /**
   * @param {Object} message The message object.
   * @param {String} reportsChannel The reports channel ID.
   * @param {String} staffRoleId The staff role ID.
   */
  constructor(message: Discord.Message, reportsChannel: string, staffRoleId: string) {
    this.message = message;
    this.reportsChannel = reportsChannel;
    this.staffRoleId = staffRoleId;
  }

  /**
  * The main function to run.
  */
  async execute() {
    try {
      const {
        content,
        author,
        guild,
        channel,
        client
      } = this.message;

      // Extract roles in message
      const report = this.message.mentions.roles
        .map(role => role.id);

      const indicator = new Discord.MessageEmbed({
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
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help'
        }
      })

      // If mentions includes @Staff
      if (report.includes(this.staffRoleId)) {
        const reportMessage = await (<Discord.TextChannel>guild.channels
          .cache
          .get(channel.id))
          .send({
            embeds: [indicator]
          });

        // Send information to report channel in an embed
        const m = await (<Discord.TextChannel>guild.channels
          .cache
          .get(this.reportsChannel))
          .send({
            embeds: [
              new Discord.MessageEmbed({
                color: 16645888,
                author: {
                  name: 'Report'
                },
                description: '',
                fields: [
                  {
                    name: 'Reporter',
                    value: `${author}`,
                    inline: true
                  },
                  {
                    name: 'Channel',
                    value: `${channel}`,
                    inline: true
                  },
                  {
                    name: 'Message',
                    value: `${content}`
                  },
                  {
                    name: 'Jump to report',
                    value: reportMessage.url
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL(),
                  text: 'Homework Help'
                }
              })
            ]
          });

        indicator.fields[1].value = `[Case](${m.url})`;

        await reportMessage
          .edit({
            embeds: [indicator]
          });

        // React with a grin
        await m
          .react('😁');

        await this.message
          .delete();

        await m
          .awaitReactions({ filter: (reaction, user) => reaction.emoji.name === '😁', max: 1 });

        await reportMessage
          .edit({
            embeds: [
              new Discord.MessageEmbed({
                color: 1441536,
                description: '',
                fields: [
                  {
                    name: 'Report',
                    value: 'A staff member has reviewed your report. If you think there was a mistake, please contact us via <@575252669443211264>.',
                    inline: true
                  },
                  {
                    name: 'Staff Link',
                    value: `[Case](${m.url})`,
                    inline: true
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL(),
                  text: 'Homework Help'
                }
              })
            ]
        });
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
