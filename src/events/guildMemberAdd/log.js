import Log from '../../log';

/**
 * @description Sends a log in #server-log advising when a member joined the server.
 */

export default class GuildMemberAdd extends Log {
  constructor(guild, user, serverLogChannel) {
    super(guild, user, serverLogChannel, 'has **joined**');
  }

  execute() {
    super.logAction();
  }
}
