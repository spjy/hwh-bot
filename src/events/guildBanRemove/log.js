const Raven = require('raven');

module.exports = {
  description: 'Sends unban message in #server-log',
  execute(guild, user, serverLogChannel) {
    const { channels } = guild;
    const { username, discriminator } = user;

    channels
      .get(serverLogChannel)
      .send(`${user} (${username}#${discriminator}) was **unbanned**.`)
      .catch(err => Raven.captureException(err));
  }
};
