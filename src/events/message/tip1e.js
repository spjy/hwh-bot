import Embed from '../../embed';

/**
 * Sends Tip1E in an embed to the current channel. Triggered by `?t1e`.
 */
export default class Tip1E extends Embed {
  /**
   * @param {Object} message - The message object instantiating `?t1e`.
   */
  constructor(message) {
    super({
      message,
      color: 1441536,
      title: 'Tip',
      description: 'If you have a question, don\'t hesitate to ask it. To save time, '
      + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
      footer: 'Homework Help Bot'
    });

    this.message = message;
  }

  /**
   * The main function to run.
   */
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
      super.setPreembed(`<@!${mention[0]}>`);
    }

    super.sendToCurrentChannel();
  }
}
