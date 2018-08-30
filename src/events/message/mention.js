const Raven = require('raven');

module.exports = {
  description: 'Mentioning system - ?mention <message ID> <role>[ <role>]',
  async execute(message, helpMentions, mentionLogChannel) {
    try {
      const {
        cleanContent: content,
        channel,
        author,
        guild
      } = message;

      // Get message id, mentions (limit of 2)
      const mention = content.trim().split(' ');
      const setting = mention[1]; // cancel or message id
      const mentions = mention.slice(2, 4);

      // Check collection to see if they have a key pending
      const helpMention = helpMentions.get(author.id);

      // Check if only ?mention
      if (!setting) {
        // Check if helpMention exists
        if (helpMention) {
          const {
            channel: helpChannel,
            date: helpDate,
            mentions: helpUserMentions,
            message: helpMessage
          } = helpMention;

          // 15 minutes
          const cooldown = helpDate + 900000;

          // Expiration time - 60 minutes
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
              .send(`${helpUserMentions.join(' ')} <@${author.id}> ${helpMessage}`);

            // Reset collection
            helpMentions.set(author.id, undefined);

            // Set unmentionable
            await Promise.all(helpUserMentions.map(async (m) => {
              await m
                .setMentionable(false);
            }));

            await guild.channels
              .get(mentionLogChannel)
              .send(`[Used] <@${author.id}> ${helpChannel} ${helpMentions} ${helpMessage}`);
          } else if (helpChannel === channel.id
              && cooldown > Date.now()) {
            await message.reply('the cooldown time (15 minutes) has not elapsed yet.');

            await guild.channels
              .get(mentionLogChannel)
              .send(`[Use attempt (cooldown)] <@${author.id}> ${helpChannel}`);
          } else if (helpChannel === channel.id
              && Date.now() >= expiration) {
            helpMentions.set(author.id, undefined);
            await message.reply('your key has expired. Generate a new one.');

            await guild.channels
              .get(mentionLogChannel)
              .send(`[Expired] <@${author.id}> ${helpChannel} ${helpMentions} ${helpMessage}`);
          } else if (helpChannel !== channel.id) {
            await message.reply(`the channel you generated your key is in <#${helpChannel}>. Use the command there.`);

            await guild.channels
              .get(mentionLogChannel)
              .send(`[Use attempt (incorrect channel)] <@${author.id}> ${helpChannel} ${helpMentions} ${helpMessage}`);
          }
        } else {
          await message.reply('you do not have a key generated. Use `?mention <message id> <role>[ <role>]` to do so.');

          await guild.channels
            .get(mentionLogChannel)
            .send(`[Use attempt (no key)] <@${author.id}>`);
        }
      // Check if message id is valid and help mention doesn't exist for user
      } else if (/^[0-9]{1,20}$/.test(setting) && !helpMention) {
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

        // Check if contains any valid roles
        if (rolesToMention.length === 0) {
          await message.reply('the role(s) you have included are invalid.');

          await guild.channels
            .get(mentionLogChannel)
            .send(`[Generation (incorrect role(s))] <@${author.id}> ${channel.id} ${mentions} ${setting}`);
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

          await message.reply(`you have generated a key for message ID ${setting}. `
            + `It'll mention ${rolesToMention[0] ? rolesToMention[0].name : ''}${rolesToMention[1] ? ` and ${rolesToMention[1].name}` : ''}.`);

          await guild.channels
            .get(mentionLogChannel)
            .send(`[Generation] <@${author.id}> ${setting} ${channel.id} ${mentions}`);
        }
      // Check if cancel ?mention cancel command
      } else if (setting.toLowerCase() === 'cancel') {
        helpMentions.set(author.id, undefined);

        await message.reply('your previously generated key has been cancelled.');

        await guild.channels
          .get(mentionLogChannel)
          .send(`[Cancel] <@${author.id}> ${channel.id} ${mentions} ${setting}`);
      } else {
        await message.reply('incorrect format.');

        await guild.channels
          .get(mentionLogChannel)
          .send(`[Generation attempt (incorrect format)] <@${author.id}> ${channel.id} ${mentions} ${setting}`);
      }

      await message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
