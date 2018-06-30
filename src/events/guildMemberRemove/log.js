const Raven = require('raven');

module.exports = {
  description: 'Sends leave message in #server-log',
  execute(member, serverLogChannel) {
    const { guild, user } = member;

    guild.channels
      .get(serverLogChannel)
      .send(`${member} (${user.username}#${user.discriminator}) has **left** the server.`)
      .catch(err => Raven.captureException(err));
  }
};
