const Raven = require('raven');

module.exports = {
  description: 'Sends leave message in #server-log',
  execute(member) {
    const { guild, user } = member;

    guild.channels
      .get('302333358078427136') // #server-log channel
      .send(`${member} (${user.username}#${user.discriminator}) has **left** the server.`)
      .catch(err => Raven.captureException(err));
  }
};
