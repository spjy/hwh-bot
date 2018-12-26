import Embed from '../../embed';

/**
 * @description Sends TipA5 in an embed to the current channel. Triggered by `?t5a`.
 * @param {Object} message - The message object instantiating `?t5a`.
 */

export default class Tip5A extends Embed {
  constructor(message) {
    super(
      message,
      1441536,
      'Tip',
      'If you have a question, don\'t hesitate to ask it. To save time, '
      + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
      null,
      'Homework Help Bot'
    );

    this.message = message;
  }

  execute() {
    const {
      mentions
    } = this.message;

    let mention;

    // Get mentions in message
    mention = mentions.members
      .map(m => m.id);

    // Check if any mentions exist
    if (mention.length > 0) {
      // Append the mention to the pre-embed.
      super.setPreembed(`<@!${mention[0]}>`);
    }

    super.sendToCurrentChannel();
  }
}
