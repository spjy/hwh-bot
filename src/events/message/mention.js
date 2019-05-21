const Raven = require('raven');

/**
* @description Sends a log in #server-log advising when a member left the server.
* @param {Object} message - The message being sent.
* @param {Collection} helpMentions - The collection of help mentions stored.
* @param {String} mentionLogChannel - The mention log channel ID.
*/

export default class Mention {
  constructor(message, helpMentions, mentionLogChannel) {
    this.message = message;
    this.helpMentions = helpMentions;
    this.mentionLogChannel = mentionLogChannel;
  }

  async execute() {
    try {
      const {
        cleanContent: content,
        channel,
        author,
        guild
      } = this.message;

      let error;
      const helpMention = this.helpMentions.get(author.id);
      const command = content.split(' ');
      const [, commandOrRole, role] = command;
      const mentions = [commandOrRole];

      if (role) {
        mentions.push(role);
      }

      if (!commandOrRole) { // trying to use mention
        if (helpMention) { // help mention exists
          const {
            channel: helpChannel,
            cooldownDate: helpDate,
            mentions: helpUserMentions,
            message: helpMessage,
            attachment: helpAttachment
          } = helpMention;

          if (Date.now() >= helpDate) { // cooldown has elapsed
            // Set roles mentionable
            await Promise.all(helpUserMentions.map(async (m) => {
              await m
                .setMentionable(true);
            }));

            // Send help mention
            await guild.channels
              .get(helpChannel)
              .send(`**Mention**: ${helpUserMentions.join(' ')} <@${author.id}> ${helpMessage}`);

            if (helpAttachment) {
              await guild.channels
                .get(helpChannel)
                .send(`**Attachment**: ${helpAttachment}`);
            }

            // Reset collection
            this.helpMentions.set(author.id, undefined);

            // Set unmentionable
            await Promise.all(helpUserMentions.map(async (m) => {
              await m
                .setMentionable(false);
            }));
          } else if (Date.now() <= helpDate) {
            error = await this.message.reply('the cooldown time (10 minutes) has not elapsed yet.');
          }
        } else { // mention doesn't exist
          error = await this.message.reply('you do not have a key generated. Use `?mention role1 [role2]` to do so. See section six (6) in #tips for more information.');
        }
      } else if (commandOrRole === 'cancel') { // cancelling mention
        this.helpMentions.set(author.id, undefined);

        error = await this.message.reply('your previously generated key has been cancelled.');
      } else { // creating a mention
        // fetch last 50 messages in the channel with the message was sent
        const messages = await channel.fetchMessages();

        // get second oldest message from user
        const question = messages.filter(m => m.author.id === author.id).array()[1];

        if (question) {
          const text = question.content; // get second oldest message
          const attachment = question.attachments.array(); // get attachments if there are any

          // Check if roles are valid

          const rolesToMention = [];

          mentions.forEach((m) => {
            guild.roles
              .forEach((r) => {
                const {
                  name,
                  color
                } = r;

                if (m.toLowerCase().replace(/-/g, ' ') === name.toLowerCase()
                  && color === 9807270) {
                  rolesToMention.push(r);
                }
              });
          });

          if (rolesToMention.length === 0) {
            error = await this.message.reply('the role(s) you have included are invalid. See #change-role for a list of mentionable roles.');
          } else {
            this.helpMentions.set(author.id, {
              channel: channel.id,
              cooldownDate: Date.now() + 600000,
              mentions: rolesToMention,
              message: text,
              attachment: attachment.length === 1 ? attachment[0].url : null
            });

            await question
              .react(guild.emojis.get('558963509077999637'));

            await this.message.reply('you have generated a key for the message indicated by <:thonk_cool:558963509077999637>. '
            + `It'll mention ${rolesToMention[0] ? rolesToMention[0].name : ''}${rolesToMention[1] ? ` and ${rolesToMention[1].name} ` : ' '}.`
            + 'Type `?mention` in ten (10) minutes to activate the mention.');
          }
        } else {
          error = await this.message.reply('you have not sent any messages recently. Try send a message again and regenerate a key.');
        }
      }

      if (error) {
        setTimeout(() => {
          error.delete();
        }, 10000);
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
