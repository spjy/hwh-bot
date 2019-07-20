const Raven = require('raven');

/**
* Sends a log in #server-log advising when a member left the server.
*/
export default class PingSg {
  /**
   * @param {Object} message - The message being sent.
   * @param {Collection} helpMentions - The collection of help mentions stored.
   * @param {String} mentionLogChannel - The mention log channel ID.
   */
  constructor(message) {
    this.message = message;
  }

  /**
  * The main function to run.
  */
  async execute() {
    try {
      const {
        cleanContent: content,
        channel,
        guild
      } = this.message;

      const sgRole = content.split(' ').slice(1, content.length - 1).join(' ');

      if (sgRole.startsWith('SG')) {
        Promise.all(guild.roles
          .map(async (role) => {
            const {
              name
            } = role;

            if (name === sgRole) {
              await role.setMentionable(true);
              await channel.send(`${role}`);
              await role.setMentionable(false);
            }
          }));
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
