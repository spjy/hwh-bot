const Raven = require('raven');

module.exports = {
  description: 'Make mentionable',
  async execute(message) {
    try {
      const {
        cleanContent: content,
        guild
      } = message;

      const option = content.split(' ')[1];

      Promise.all(guild.roles
        .map(async (role) => {
          const {
            color,
            name
          } = role;

          if (color === 9807270) {
            await role.setMentionable(JSON.parse(option));
            await message.reply(`${name} mentionability changed.`);
          }
        }));
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
