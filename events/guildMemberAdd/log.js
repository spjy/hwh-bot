const Raven = require('raven');

module.exports = {
  description: 'Sends join message in #server-log',
  execute(member) {
    const { channels } = member.guild;

    channels
      .get('302333358078427136') // #server-log channel
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **joined** the server.`)
      .catch(err => Raven.captureException(err));
  }
};
