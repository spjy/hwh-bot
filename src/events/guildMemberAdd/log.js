const Raven = require('raven');

module.exports = {
  description: 'Sends join message in #server-log',
  execute(member, serverLogChannel) {
    const { guild, user } = member;

    guild.channels
      .get(serverLogChannel)
      .send(`${member} (${user.username}#${user.discriminator}) has **joined** the server.`)
      .catch(err => Raven.captureException(err));
  }
};
