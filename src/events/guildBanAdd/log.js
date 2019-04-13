import Log from '../../log';

/**
 * @description Sends a log in #server-log advising when a ban occurs.
 */

export default class GuildBanAdd extends Log {
  constructor(guild, user, serverLogChannel) {
    super({
      guild,
      user,
      channel: serverLogChannel,
      message: 'was **banned**'
    });
  }

  execute() {
    super.logAction();
  }
}
