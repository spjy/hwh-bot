const Raven = require('raven');

/**
 * Log an action to a specified channel.
 * @param {Object} guild - The guild where the event was fired.
 * @param {Object} user - The user instantiating the event.
 * @param {string} channel - The channel that will contain the logged message.
 * @param {string} [prefix = ''] - A prefix before the log.
 * @param {string} [message = ''] - A message describing the log, to be appended at the end.
 */

export default class Log {
  constructor(guild, user, channel, prefix = '', message = '') {
    this.guild = guild;
    this.user = user;
    this.channel = channel;
    this.message = message;
    this.prefix = prefix;
  }

  setMessage(message) {
    this.message = message;
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  async logAction() {
    try {
      const { channels } = this.guild;
      const { username, discriminator } = this.user;

      await channels
        .get(this.channel)
        .send(`${this.prefix ? this.prefix : ''}${this.user} (${username}#${discriminator}) ${this.message}.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
