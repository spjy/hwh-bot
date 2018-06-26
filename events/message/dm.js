const Raven = require('raven');

module.exports = {
  description: 'DM Commands (>h, >c, ?ta5)',
  execute(message) {
    const {
      cleanContent: content,
      channel,
      client
    } = message;

    const messageInitiator = channel.recipient;
    const botOperator = '>';
    const serverChannel = client.channels.get('298286259028361218');

    if (content.startsWith(`${botOperator}challenge`) || content.startsWith(`${botOperator}c`)) {
      serverChannel
        .send(`*Challenge Entry* from **${messageInitiator}**: ${content}`)
        .catch(err => Raven.captureException(err));
      message
        .reply('Successfully sent!')
        .catch(err => Raven.captureException(err));
    } else if (content.startsWith(`${botOperator}help`) || content.startsWith(`${botOperator}h`)) {
      message
        .reply('I am a functional bot for the Homework Help Server!'
          + ' Here is a list of command(s):\n\n'
          + '**>c** <challenge ID> <link to your solution> - entering work for the challenge problem.\n'
          + '**?ta5** <@user> - macro saying "If you have a question, don\'t hesitate to ask it. To save time,'
          + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?""')
        .catch(err => Raven.captureException(err));
    }
  }
};
