const Raven = require('raven');

module.exports = {
  description: 'Sends ban message in #server-log',
  execute(guild, user) {
    const { channels } = guild;

    channels
      .get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **banned**.`)
      .catch(err => Raven.captureException(err));
  }
};
