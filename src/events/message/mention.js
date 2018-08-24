const Raven = require('raven');

module.exports = {
  description: 'Mentioning system - ?mention <message ID> <roles ...>',
  async execute(message, helpMentions) {
    try {
      const {
        cleanContent: content,
        channel,
        author,
        guild
      } = message;

      // Get message id, mentions (limit of 2)
      const mention = content.split(' ');
      const setting = mention[1]; // cancel or message id
      const mentions = mention.slice(2, 4);

      // Validate message id
      if (setting.test(/^[0-9]{1,20}$/)) {
        // Check collection to see if they have a key pending
        const helpMention = helpMentions.get(author.id);

        // If undefined or doesn't include channel
        if (helpMention) {
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
          if (helpChannel === channel.id
            && cooldown <= Date.now()) {
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
          } else if (helpChannel === channel.id
              && cooldown > Date.now()) {
            await message.reply('the cooldown time (15 minutes) has not elapsed yet.');
          } else if (helpChannel === channel.id
              && Date.now() >= expiration) {
            helpMentions.set(author.id, undefined);
            await message.reply('your key has expired. Generate a new one.');
          } else if (helpChannel !== channel.id) {
            await message.reply(`The channel you generated your key is in <#${channel.id}>. Use the command there.`);
          }
        } else if (!helpMention) {
          let rolesToMention = [];

          // Check for role by name and push Guild object to array
          mentions.forEach((m) => {
            guild.roles
              .forEach((role) => {
                const {
                  name,
                  color
                } = role;

                if (m.toLowerCase().replace(/-/g, ' ') === name.toLowerCase()
                  && color === 9807270) {
                  rolesToMention.push(role);
                }
              });
          });

          if (!rolesToMention) {
            await message.reply('the role(s) you have included are invalid.');
          } else {
            // Get message content
            const m = await channel
              .fetchMessage(setting);

            helpMentions.set(author.id, {
              channel: channel.id,
              date: Date.now(),
              mentions: rolesToMention,
              message: m.cleanContent
            });

            await message.reply(`you have generated a key (redeemable in 15 minutes) for ${setting}. It'll mention ${mentions}.`);
          }
        }

        await message
          .delete();
      } else if (setting.toLowerCase() === 'cancel') {
        helpMentions.set(author.id, undefined);
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
