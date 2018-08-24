const Raven = require('raven');

module.exports = {
  description: 'Make mentionable',
  execute(message) {
    const {
      cleanContent: content,
      guild
    } = message;

    const option = content.split(' ')[1];

    guild.roles
      .forEach((role) => {
        const {
          color,
          name
        } = role;

        if (color === 9807270) {
          role.setMentionable(JSON.parse(option))
            .then(() => {
              message.reply(`${name} mentionability changed.`);
            })
            .catch((err) => Raven.captureException(err));
        }
      });
  }
};
