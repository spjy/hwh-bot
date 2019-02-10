import Log from '../../log';

/**
 * @description Sends a log in #server-log advising when a member left the server.
 */

export default class GuildMemberAdd extends Log {
  constructor(guild, user, serverLogChannel) {
    super(guild, user, serverLogChannel, null, 'has **left**');
  }

  execute() {
    super.logAction();
  }
}
