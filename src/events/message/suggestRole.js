const Raven = require('raven');

module.exports = {
  description: 'Suggest role in #suggest-role',
  execute(message, suggestRoleChannel, changeRoleChannel, roleRequestChannel) {
    const {
      cleanContent: content,
      guild,
      member,
      client
    } = message;

    const suggestion = content.slice(1); // get first part of string (command)

    const validRole = guild.roles
      .map(role => {
        const {
          name
        } = role;

        if (suggestion.toLowerCase() === name.toLowerCase()) {
          member.guild.channels
            .get(suggestRoleChannel)
            .send(`Role already exists. You can add it in 
              ${client.channels.get(changeRoleChannel).toString()}.`)
            .catch(err => Raven.captureException(err));
          return true;
        }
        return false;
      });

    if (!validRole.includes(true)) { // If the role exists
      message.reply(`suggested role ${suggestion} received.`);

      guild.channels
        .get(roleRequestChannel)
        .send(suggestion)
        .then((msg) => {
          msg.react('😁');
          msg.react('❌');
        })
        .catch(err => Raven.captureException(err));
    }

    message
      .delete()
      .catch(err => Raven.captureException(err));
  }
};
