const Raven = require('raven');

module.exports = {
  description: 'On @HWH Staff, delete msg and send message in private channel.',
  async execute(message, reportsChannel, staffRoleId) {
    try {
      const {
        cleanContent: content,
        author,
        guild,
        channel,
        client
      } = message;

      const report = message.mentions.roles // Extract roles in message
        .map(role => role.id);

      if (report.includes(staffRoleId)) { // If mentions includes @HWH Staff
        await message
          .reply('thank you for your report. We will review it shortly.');

        const m = await message.guild.channels
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
                    value: `https://discordapp.com/channels/${guild.id}/${channel.id}/${message.id}`
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

        await m
          .react('😁');

        await message
          .delete();
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};