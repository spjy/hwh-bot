const Raven = require('raven');

module.exports = {
  description: 'Sends ban message in #server-log',
  execute(guild, user) {
    const { channels } = guild;
    const { username, discriminator } = user;

    channels
      .get('302333358078427136') // #server-log channel
      .send(`${user} (${username}#${discriminator}) was **banned**.`)
      .catch(err => Raven.captureException(err));
  }
};
