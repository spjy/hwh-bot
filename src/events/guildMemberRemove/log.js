const Raven = require('raven');

module.exports = {
  description: 'Sends leave message in #server-log',
  async execute(member, serverLogChannel) {
    try {
      const { guild, user } = member;

      await guild.channels
        .get(serverLogChannel)
        .send(`${member} (${user.username}#${user.discriminator}) has **left** the server.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
