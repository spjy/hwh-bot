const Raven = require('raven');

module.exports = {
  description: 'On @HWH Staff, delete msg and send message in private channel.',
  execute(message, reportsChannel, staffRoleId) {
    const {
      cleanContent: content,
      author,
      channel,
      client
    } = message;

    const report = message.mentions.roles // Extract roles in message
      .map(role => role.id);

    if (report.includes(staffRoleId)) { // If mentions includes @HWH Staff
      message
        .reply('thank you for your report. We will review it shortly.')
        .catch(err => Raven.captureException(err)); // Reply in channel with report

      message.guild.channels
        .get(reportsChannel) // Send information to report channel
        .send(
          '', {
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
                  value: `https://discordapp.com/channels/238956364729155585/${channel.id}/${message.id}`
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help'
              }
            }
          }
        )
        .then((msg) => {
          msg.react('😁');
        })
        .catch(err => Raven.captureException(err));

      message
        .delete()
        .catch(err => Raven.captureException(err));
    }
  }
};
