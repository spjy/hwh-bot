const Raven = require('raven');

module.exports = {
  description: 'Sends unban message in #server-log',
  execute(guild, user) {
    const { channels } = guild;

    channels
      .get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **unbanned**.`)
      .catch(err => Raven.captureException(err));
  }
};
