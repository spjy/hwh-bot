const Embed = require('../../embed.js').default;

module.exports = {
  description: 'Posts Tip A.5 in embed',
  async execute(message) {
    const {
      mentions
    } = message;

    let mention;

    if (mentions.members) {
      mention = mentions.members // Get mentions in message
        .map(m => m.id);
    }

    new Embed(
      message,
      1441536,
      'Tip',
      'If you have a question, don\'t hesitate to ask it. To save time, '
        + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
      null,
      'Homework Help',
      `${mention[0] ? `<@!${mention[0]}>` : ''}`
    ).sendToCurrentChannel();
  }
};
