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
      title: 'Mention',
      preembed: `<@${message.member.id}>`
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

      let roleToMention = null;

      guild.roles.cache
        .some((r) => {
          const {
            name,
            color
          } = r;

          // Remove number in channel name (e.g. math-2)
          // and replace dashes with spaces to get role name
          if (mention.toLowerCase().replace(/-[a-z]$/, '').replace(/-/g, ' ') === name.toLowerCase()
              && color === 9807270) {
            roleToMention = r;

            return true;
          }

          return false;
        });

      // If valid role, add to help mentions collection
      if (roleToMention) {
        this.helpMentions.set(author.id, {
          channel: channel.id,
          cooldownDate: Date.now() + 600000,
          mention: roleToMention,
          message: text,
          attachment: attachment.length === 1 ? attachment[0].url : null
        });

        await question
          .react('✅');

        const confirm = await this.message
          .reply('HWH Bot has reacted to the message that will be mentioned. Once you confirm that it includes a specific, answerable question, react with the checkmark to generate the key.');

        await question
          .awaitReactions((reaction, user) => reaction.emoji.name === '✅' && user.id === author.id, { max: 1 });

        await confirm.delete();

        this.setDescription(`Successfully generated a key for [this message](${question.url}).\n\n`
          + 'Type `?mention` in ten (10) minutes to mention <@&' + roleToMention + '> in <#' + channel.id + '>.');

        this.setTimestamp(Date.now() + 600000);

        this.setFooter('Mentionable at');

        await super.sendToCurrentChannel();
      } else {
        await this.message.reply('the role(s) you have included are invalid. See <#275071813992710144> for a list of mentionable roles.');
      }
    } else {
      // nothing provided
    }
  }

  async sendMention(author, helpMention) {
    const {
      guild
    } = this.message;

    const {
      channel: helpChannel,
      cooldownDate: helpDate,
      mention: helpUserMention,
      message: helpMessage,
      attachment: helpAttachment
    } = helpMention;

    if (Date.now() >= helpDate) { // cooldown has elapsed
      // Send help mention
      this.setPreembed(`${helpUserMention}`);

      this.setDescription(`<@${author}>: ${helpMessage}`);

      this.setChannelToSend(helpChannel);

      super.sendToDifferentChannel();

      if (helpAttachment) {
        await guild.channels
          .cache
          .get(helpChannel)
          .send(`**Attachment**: ${helpAttachment}`);
      }

      // Reset collection
      this.helpMentions.set(author, undefined);

      await guild.channels
        .cache
        .get(this.mentionLogChannel)
        .send(`<@${author}> sent mention in <#${helpChannel}>`);
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
      // Check if user already has mention pending.
      // Will retrieve the last sent message. Adds a check mark and x mark
      // Checkmark reaction to confirm that is the correct message, x reaction to cancel.
      // Creates a key with time displayed and will mention if 15 minutes has elapsed.

      // Check if has ?mention ban role. If so, error.
      if (member.roles.cache.has(this.mentionBanId)) {
        await this.message.reply('you are banned from using the `?mention` command. Contact <@575252669443211264> to appeal.');

        return;
      }

      // Allow mentions in help categories
      if (!channel.parent.name.toLowerCase().endsWith('help')) {
        await this.message.reply('you can only use mentions in help channels.');

        return;
      }

      // Retrieve stored helpMention according to user ID
      const helpMention = this.helpMentions.get(author.id);

      // Get command
      const command = content.split(' ');

      // get second argument of message (if applicable)
      let [, mention] = command;

      // Creating a mention - if mention not found and channel/role exists
      // Parse provided input (channel name, role name, or nothing)
      if (!helpMention && mention && mention !== 'cancel') {
        // If channel name, remove hashtag. Otherwise, keep role name.
        if (mention.startsWith('#')) {
          mention = mention.substr(1); // extract channel name
        }

        await this.createMention(mention);
      } else if (!helpMention && !mention) {
        // If general category ping
        mention = channel.name; // get category name

        await this.createMention(mention);
      } else if (mention && mention === 'cancel') {
        await this.helpMentions.set(author.id, undefined);

        await this.message.reply('your previously generated key has been cancelled.');
      } else if (helpMention && !mention) {
        // Trying to ping - mention exists and no channel/role is provided
        await this.sendMention(author.id, helpMention);
      } else if (helpMention) {
        // Already have a key, but want to override it.
        const error = await this.message.reply('your previously generated key has been overidden and will create a new key.');

        await this.helpMentions.set(author.id, undefined);

        await error.delete();

        await this.execute();
      } else { // mention doesn't exist
        await this.message.reply('you do not have a key generated. Use `?mention [role/channel]` to do so. See section six (6) in <#427771420190441472> for more information.');
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
