module.exports = {
  name: 'report',
  description: 'On @HWH Staff, delete msg and send message in private channel',
  execute(message) {
    const {
      cleanContent: content,
      author,
      channel,
      client
    } = message;
    // If channel is not in #reports and author is not @HWH
    const report = message.mentions.roles // Extract roles in message
      .map(role => role.id);

    if (report.includes('276969339901444096')) { // If mentions include @HWH Staff
      message
        .reply('thank you for your report. We will review it shortly.')
        .catch(err => console.error(err)); // Reply in channel with report

      message.guild.channels
        .get('446051447226761216') // Send information to report channel
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
                  value: `https://discordapp.com/channels/238956364729155585/${channel.id}?jump=${message.id}`
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
        .catch(err => console.error(err));
      message
        .delete()
        .catch(err => console.error(err));
    }
  }
};
