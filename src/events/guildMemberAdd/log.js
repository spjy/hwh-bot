const Raven = require('raven');

module.exports = {
  description: 'Sends join message in #server-log',
  async execute(member, serverLogChannel) {
    try {
      const { guild, user } = member;

      await guild.channels
        .get(serverLogChannel)
        .send(`${member} (${user.username}#${user.discriminator}) has **joined** the server.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
