const Raven = require('raven');

module.exports = {
  description: 'Mentioning system',
  async execute(message, helpMentions) {
    try {
      const {
        cleanContent: content,
        channel,
        author,
        guild
      } = message;

      // Get author id (key), channel, current date, mentions
      const mention = content.split(' ');
      const messageId = mention[1];
      const mentions = mention.slice(2, mention.length);

      // Check collection to see if they have a key pending
      const helpMention = helpMentions.get(author.id);

      // If undefined or doesn't include channel
      if (!helpMention) {
        let rolesToMention = [];

        // Check for role by name and push Guild object to array
        mentions.forEach((m) => {
          guild.roles
            .forEach((role) => {
              const {
                name,
                color
              } = role;

              if (m.toLowerCase() === name.toLowerCase() && color === 9807270) {
                rolesToMention.push(role);
              }
            });
        });

        if (!rolesToMention) {
          await message.reply('the role(s) you have included are invalid.');
        } else {
          // Get message content
          const m = await channel
            .fetchMessage(messageId);

          helpMentions.set(author.id, {
            channel: channel.id,
            date: Date.now(),
            mentions: rolesToMention,
            message: m.content
          });

          await message.reply('you may type ?mention to use your key in 15 minutes. Use it within an hour, otherwise it will expire.');
        }
      } else if (helpMention) {
        const {
          channel: helpChannel,
          date: helpDate,
          mentions: helpUserMentions,
          message: helpMessage
        } = helpMention;

        // 15 minutes
        const cooldown = helpDate + 900000;

        // Expiration date - 60 minutes
        const expiration = helpDate + 3600000;

        // Check if matching channels and if 15 minutes later
        if (helpChannel === channel.id && cooldown <= Date.now()) {
          // Set roles mentionable
          await Promise.all(helpUserMentions.map(async (m) => {
            await m
              .setMentionable(true);
          }));

          // Send help mention
          await message.guild.channels
            .get(helpChannel)
            .send(`${helpUserMentions} <@${author.id}> ${helpMessage}`);

          // Reset collection
          helpMentions.set(author.id, undefined);

          // Set unmentionable
          await Promise.all(helpUserMentions.map(async (m) => {
            await m
              .setMentionable(false);
          }));
        } else if (helpChannel === channel.id && cooldown > Date.now()) {
          await message.reply('the cooldown time (15 minutes) has not elapsed yet.');
        } else if (helpChannel === channel.id && Date.now() >= expiration) {
          helpMentions.set(author.id, undefined);
          await message.reply('your key has expired.');
        }
      }

      await message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
