import Discord from 'discord.js'
import Raven from 'raven';

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
        client,
        mentions
      } = this.message;

      // Extract roles in message
      const report = mentions.roles
        .map(role => role.id);

        // If mentions includes @Staff
      if (report.includes(this.staffRoleId)) {
        const indicator = new Discord.MessageEmbed({
          color: 16645888,
          description: "",
          fields: [
            {
              name: "Report",
              value: "Thank you for the report. We will review it shortly.",
              inline: true,
            },
            {
              name: "Staff Link",
              value: "-",
              inline: true,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL(),
            text: "Homework Help",
          },
        });

        const reportMessage = await (<Discord.TextChannel>guild.channels
          .cache
          .get(channel.id))
          .send({
            embeds: [indicator]
          });

        const resolve = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setCustomId('report::0')
              .setLabel('Resolve Report')
              .setStyle('DANGER'),
          );

        // Send information to report channel in an embed
        const m = await (<Discord.TextChannel>guild.channels
          .cache
          .get(this.reportsChannel))
          .send({
            components: [resolve],
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
                    name: 'Offender',
                    value: 'No offender provided.'
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
      }
    } catch (err) {
      console.log(err)
      Raven.captureException(err);
    }
  }
}
