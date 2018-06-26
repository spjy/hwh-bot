const Raven = require('raven');

module.exports = {
  description: 'Posts Tip A.5 in embed',
  execute(message) {
    const {
      mentions,
      channel,
      client
    } = message;

    let mention;

    if (mentions.members) {
      mention = mentions.members // Get mentions in message
        .map(m => m.id);
    }

    channel
      .send(
        `${mention[0] ? `<@${mention[0]}>` : ''}`, // If mention is included, add it to message
        {
          embed: {
            color: 1441536,
            author: {
              name: 'Tip'
            },
            description: 'If you have a question, don\'t hesitate to ask it. To save time,'
              + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
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
};
