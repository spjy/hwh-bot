import Log from '../../log';

/**
 * @description Sends a log in #server-log advising when an unban occurs.
 */

export default class GuildBanRemove extends Log {
  constructor(guild, user, serverLogChannel) {
    super(guild, user, serverLogChannel, 'was **unbanned**');
  }

  execute() {
    super.logAction();
  }
}
