import Discord from 'discord.js';
import Raven from 'raven';

export default class DM {
  async execute(message: Discord.Message, client, botMessagesChannel) {
    try {
      const {
        cleanContent: content,
        channel: dmChannel,
        attachments,
      } = message;

      const channel = <Discord.DMChannel>dmChannel;

      const operator = '>';

      if (content.startsWith(`${operator}challenge`) || content.startsWith(`${operator}c`)) {
        await client.channels
          .cache
          .get(botMessagesChannel)
          .send({
            content: `*Challenge Entry* from **${channel.recipient}**: ${content}`,
            files: attachments.map((a) => a.url)
          });

        await message
          .reply('Successfully sent!');
      } else if (content.startsWith(`${operator}help`) || content.startsWith(`${operator}h`)) {
        await message
          .reply('I am a functional bot for the Homework Help Server!'
            + ' Here is a list of command(s):\n\n'
            + '**>c** <challenge ID> <link/attachment to your solution> - entering work for the challenge problem.\n');
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
