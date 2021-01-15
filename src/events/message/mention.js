const Raven = require('raven');
import Embed from '../../embed';

/**
* Sends a log in #server-log advising when a member left the server.
*/
export default class Mention extends Embed {
  /**
   * @param {Object} message - The message being sent.
   * @param {Collection} helpMentions - The collection of help mentions stored.
   * @param {String} mentionLogChannel - The mention log channel ID.
   */
  constructor(message, helpMentions, mentionLogChannel, mentionBanId) {
    super({
      message,
      color: 16645888,
      title: 'Mention'
    });

    this.message = message;
    this.helpMentions = helpMentions;
    this.mentionLogChannel = mentionLogChannel;
    this.mentionBanId = mentionBanId;
  }

  async createMention(helpMention) {
    const {
      channel,
      author,
      guild
    } = this.message;

    let mention = helpMention;

    // fetch last 50 messages in the channel with the message was sent
    const messages = await this.message.channel.messages.fetch();

    // get second oldest message from user
    const question = messages.filter(m => m.author.id === author.id).array()[1];

    // If message is found, put a checkmark to confirm
    if (question) {
      const text = question.content; // get second oldest message content
      const attachment = question.attachments.array(); // get attachments if there are any

      const roleToMention = null;

      guild.roles.cache
        .some((r) => {
          const {
            name,
            color
          } = r;

          if (mention.toLowerCase().replace(/-/g, ' ') === name.toLowerCase()
              && color === 9807270) {
            roleToMention = r;

            return true;
          }

          return false;
        });

      // If valid role, add to help mentions collection
      if (roleToMention) {
        await this.message.reply('the role(s) you have included are invalid. See #change-role for a list of mentionable roles.');
      } else {
        this.helpMentions.set(author.id, {
          channel: channel.id,
          cooldownDate: Date.now() + 600000,
          mentions: roleToMention,
          message: text,
          attachment: attachment.length === 1 ? attachment[0].url : null
        });

        await question
          .react('✅');

        await this.message.reply('you have generated a key for the message indicated by ✅. '
          + `It'll mention ${roleToMention}. `
          + 'Type `?mention` in ten (10) minutes to activate the mention.');
      }
    } else {
      // nothing provided
    }
  }

  async sendMention(helpMention) {
    const {
      guild,
      author
    } = this.message;

    const {
      channel: helpChannel,
      cooldownDate: helpDate,
      mentions: helpUserMentions,
      message: helpMessage,
      attachment: helpAttachment
    } = helpMention;

    if (Date.now() >= helpDate) { // cooldown has elapsed
      // Send help mention
      await guild.channels
        .cache
        .get(helpChannel)
        .send(`**Mention**: ${helpUserMentions.join(' ')} <@${author.id}> ${helpMessage}`);

      if (helpAttachment) {
        await guild.channels
          .cache
          .get(helpChannel)
          .send(`**Attachment**: ${helpAttachment}`);
      }

      // Reset collection
      this.helpMentions.set(author.id, undefined);
    } else if (Date.now() <= helpDate) {
      await this.message.reply('the cooldown time (10 minutes) has not elapsed yet.');
    }
  }

  /**
  * The main function to run.
  */
  async execute() {
    try {
      const {
        cleanContent: content,
        channel,
        author,
        member
      } = this.message;

      // ?mention [channel/role] - role optional, if not provided, use category mention
      // Check if has ?mention ban role. If so, error.
      // Check if user already has mention pending.
      // Will retrieve the last sent message. Adds a check mark and x mark
      // Checkmark reaction to confirm that is the correct message, x reaction to cancel.
      // Creates a key with time displayed and will mention if 15 minutes has elapsed.

      if (member.roles.has(this.mentionBanId)) {
        // return;
      }

      const helpMention = this.helpMentions.get(author.id);

      const command = content.split(' ');

      // get second argument of message
      let [, mention] = command;

      // Creating a mention - if mention not found and channel/role exists
      // Parse provided input (channel name, role name, or nothing)
      if (!helpMention && mention && mention !== 'cancel') {
        // If channel name, remove hashtag. Otherwise, keep text name.
        if (mention.startsWith('#')) {
          mention = mention.shift(); // extract channel name
        }

        this.createMention(mention);
      } else if (!helpMention && !mention) {
        // If general category ping
        mention = channel.parent.name; // get category name

        this.createMention(mention);
      } else if (helpMention && !mention) {
        // Trying to ping - mention exists and no channel/role is provided
        this.sendMention(helpMention);
      } else if (!helpMention && mention === 'cancel') {
        this.helpMentions.set(author.id, undefined);

        await this.message.reply('your previously generated key has been cancelled.');
      } else { // mention doesn't exist
        await this.message.reply('you do not have a key generated. Use `?mention role1 [role2]` to do so. See section six (6) in #tips for more information.');
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
