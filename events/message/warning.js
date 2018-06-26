const Raven = require('raven');

module.exports = {
  description: 'Warning message ?gwarn',
  execute(message) {
    const {
      cleanContent: content,
      mentions,
      channel,
      client
    } = message;

    let warn;
    let reason;

    const warned = mentions.members
      .map(m => m.id);

    if (warned !== undefined) {
      warn = content.split(' ');
      reason = warn.slice(2, warn.length); // Get the third->last array element

      channel
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
                  value: warn[2] === undefined ? 'No reason provided.' : reason.join(' ')
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
        .catch(err => Raven.captureException(err));

      message
        .delete()
        .catch(err => Raven.captureException(err));
    }
  }
};
