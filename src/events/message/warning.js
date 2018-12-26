import Raven from 'raven';
import Embed from '../../embed';

/**
 * @description Creates an embed containing the user warned and the reason.
 * Triggered through `?gwarn @user reason`.
 * @param {Object} message - The message object instantiating `?gwarn`.
 */

export default class Warning extends Embed {
  constructor(message) {
    super(
      message,
      16645888,
      'Warning',
      null,
      null,
      'NOTE: If you wish to clarify or contest this warning, please contact a staff member via direct message (not in channel).',
    );
  }

  async execute() {
    try {
      const {
        content,
        mentions,
        channel
      } = this.message;

      let warn;
      let reason;

      const warned = mentions.members
        .map(m => m.id);

      if (warned) {
        warn = content.split(' ');
        reason = warn.slice(2, warn.length); // Get the third->last array element

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
