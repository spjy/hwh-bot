const Raven = require('raven');

module.exports = {
  description: 'DM Commands (>h, >c, ?ta5)',
  execute(message) {
    const {
      cleanContent: content,
      channel,
      client
    } = message;

    const operator = '>';

    if (content.startsWith(`${operator}challenge`) || content.startsWith(`${operator}c`)) {
      client.channels
        .get('298286259028361218')
        .send(`*Challenge Entry* from **${channel.recipient}**: ${content}`)
        .catch(err => Raven.captureException(err));

      message
        .reply('Successfully sent!')
        .catch(err => Raven.captureException(err));
    } else if (content.startsWith(`${operator}help`) || content.startsWith(`${operator}h`)) {
      message
        .reply('I am a functional bot for the Homework Help Server!'
          + ' Here is a list of command(s):\n\n'
          + '**>c** <challenge ID> <link/attachment to your solution> - entering work for the challenge problem.\n')
        .catch(err => Raven.captureException(err));
    }
  }
};
