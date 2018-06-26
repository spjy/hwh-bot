module.exports = {
  name: 'log',
  description: 'Sends message in #server-log',
  execute(member) {
    const { channels } = member.guild;

    channels
      .get('302333358078427136')
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **joined** the server.`)
      .catch(err => console.error(err));
  }
};
