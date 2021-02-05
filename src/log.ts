import Discord from 'discord.js'
import Raven from 'raven';

/**
 * Log an action to a specified channel.
 */
export default class Log {
  guild: Discord.Guild
  user: Discord.User
  channel: string
  message: string
  prefix: string

  /**
   * @param {Object} guild - The guild where the event was fired.
   * @param {Object} user - The user instantiating the event.
   * @param {string} channel - The channel that will contain the logged message.
   * @param {string} [prefix = ''] - A prefix before the log.
   * @param {string} [message = ''] - A message describing the log, to be appended at the end.
   */
  constructor({
    guild = undefined,
    user = undefined,
    channel = undefined,
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
  setMessage(message: string): void {
    this.message = message;
  }

  /**
   * Sets the prefix text.
   * @param {String} prefix 
   */
  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  /**
   * Send the log message to a certain channel. 
   */
  async logAction(): Promise<void> {
    try {
      const { channels } = this.guild;
      const { username, discriminator } = this.user;

      await (<Discord.TextChannel>(channels
        .cache
        .get(this.channel)))
        .send(`${this.prefix ? this.prefix : ''}${this.user} (${username}#${discriminator}) ${this.message}.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
