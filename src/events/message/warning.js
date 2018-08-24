const Raven = require('raven');

module.exports = {
  description: 'Warning message ?gwarn',
  async execute(message) {
    try {
      const {
        content,
        mentions,
        channel,
        client
      } = message;

      let warn;
      let reason;

      const warned = mentions.members
        .map(m => m.id);

      if (warned) {
        warn = content.split(' ');
        reason = warn.slice(2, warn.length); // Get the third->last array element

        await channel
          .send(
            '', {
              embed: {
                color: 16645888,
                author: {
                  name: 'Warning'
                },
                description: `<@!${warned[0]}> was warned by a staff member.`,
                fields: [
                  {
                    name: 'Reason',
                    value: warn[2] === undefined
                      ? 'No reason provided.'
                      : reason.join(' ')
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'NOTE: If you wish to clarify or contest this warning, please contact a staff member via direct message (not in channel).'
                }
              }
            }
          );

        await message
          .delete();
      } else {
        const error = await channel.send('No mention supplied.');

        await setTimeout(() => {
          error.delete();
        }, 5000);
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
