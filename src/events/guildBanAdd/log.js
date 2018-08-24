const Raven = require('raven');

module.exports = {
  description: 'Sends ban message in #server-log',
  async execute(guild, user, serverLogChannel) {
    try {
      const { channels } = guild;
      const { username, discriminator } = user;

      await channels
        .get(serverLogChannel)
        .send(`${user} (${username}#${discriminator}) was **banned**.`);
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
