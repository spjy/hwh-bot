const Raven = require('raven');

/**
 * Log an action to a specified channel.
 */
export default class Log {
  /**
   * @param {Object} guild - The guild where the event was fired.
   * @param {Object} user - The user instantiating the event.
   * @param {string} channel - The channel that will contain the logged message.
   * @param {string} [prefix = ''] - A prefix before the log.
   * @param {string} [message = ''] - A message describing the log, to be appended at the end.
   */
  constructor({
    guild,
    user,
    channel,
    prefix = '',
    message = ''
  } = {}) {
    this.guild = guild;
    this.user = user;
    this.channel = channel;
    this.message = message;
    this.prefix = prefix;
  }

  /**
   * Sets the main message to convey in the log.
   * @param {String} message 
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   * Sets the prefix text.
   * @param {String} prefix 
   */
  setPrefix(prefix) {
    this.prefix = prefix;
  }

  /**
   * Send the log message to a certain channel. 
   */
  async logAction() {
    try {
      const { channels } = this.guild;
      const { username, discriminator } = this.user;

      await channels
        .cache
        .get(this.channel)
        .send(`${this.prefix ? this.prefix : ''}${this.user} (${username}#${discriminator}) ${this.message}.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
