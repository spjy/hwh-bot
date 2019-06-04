import Log from '../../log';

/**
 * Sends a log in #server-log advising when an unban occurs.
 */
export default class GuildBanRemove extends Log {
  /**
  * The constructor.
  * @param guild The guild where the event was initialized.
  * @param user The user that initialized the event.
  * @param serverLogChannel The channel to log the message to.
  */
  constructor(guild, user, serverLogChannel) {
    super({
      guild,
      user,
      channel: serverLogChannel,
      message: 'was **unbanned**'
    });
  }

  /**
  * The main function to run.
  */
  execute() {
    super.logAction();
  }
}
