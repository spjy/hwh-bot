module.exports = {
  name: 'log',
  description: 'Sends message in #server-log',
  execute(guild, user) {
    const { channels } = guild;

    channels
      .get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **banned**.`)
      .catch(err => console.error(err));
  }
};
