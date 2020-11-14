import Raven from 'raven';
import Embed from '../../embed';

/**
 * Detect when a user includes the @Staff ping, generate a report in the
 * specified reports channel.
 */
export default class Report extends Embed {
  /**
   * @param {Object} message The message object.
   * @param {String} reportsChannel The reports channel ID.
   * @param {String} staffRoleId The staff role ID.
   */
  constructor(message, reportsChannel, staffRoleId) {
    super({
      message,
      color: 16645888,
      title: 'Report'
    });

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

      // If mentions includes @Staff
      if (report.includes(this.staffRoleId)) {
        const reportMessage = await guild.channels
          .cache
          .get(channel.id)
          .send('Thank you for your report. We will review it shortly.');

        // Send information to report channel in an embed
        const m = await this.message.guild.channels
          .cache
          .get(this.reportsChannel)
          .send(
            '',
            {
              embed: {
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
                    value: `https://discordapp.com/channels/${guild.id}/${reportMessage.channel.id}/${reportMessage.id}`
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'Homework Help'
                }
              }
            }
          );

        // React with a grin
        await m
          .react('😁');

        await this.message
          .delete();

        await m
          .awaitReactions((reaction, user) => reaction.emoji.name === '😁', { max: 1 });

        await reportMessage
          .edit('A staff member has reviewed your report. If you think there was a mistake, please contact us via ModMail (see the top of the user list).')
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
