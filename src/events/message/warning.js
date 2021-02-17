import Raven from 'raven';
import Embed from '../../embed';

/**
 * Creates an embed containing the user warned and the reason.
 * Triggered through `?gwarn @user reason`.
 */

export default class Warning extends Embed {
  /**
   * @param {Object} message - The message object instantiating `?gwarn`.
   */
  constructor(message) {
    super({
      message,
      color: 16645888,
      title: 'Warning',
      footer: 'To clarify or contest this warning, contact us via ModMail.'
    });
  }

  /**
   * The main function to run.
   */
  async execute() {
    try {
      const {
        content,
        mentions,
        channel
      } = this.message;

      let warn;
      let reason;

      // Get mention included in warning
      const warned = mentions.members
        .map(m => m.id);

      // Check if mention was included
      if (warned && warned[0]) {
        warn = content.split(' ');
        // Get the message included by staff
        reason = warn.slice(2, warn.length);

        super.setDescription(`<@!${warned[0]}> was warned by a staff member.`);
        super.setFields(
          [
            {
              name: 'Reason',
              value: warn[2] === undefined
                ? 'No reason provided.'
                : reason.join(' ')
            }
          ],
        );

        super.sendToCurrentChannel();
      } else {
        const error = await channel.send('No mention supplied.');

        await setTimeout(() => {
          error.delete();
        }, 5000);
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
