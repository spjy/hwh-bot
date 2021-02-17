const Raven = require('raven');

module.exports = {
  description: 'Suggest role in #suggest-role',
  async execute(message, suggestRoleChannel, changeRoleChannel, roleRequestChannel) {
    try {
      const {
        cleanContent: content,
        guild,
        member
      } = message;

      const suggestion = content.slice(1); // get first part of string (command)

      // Check if the role exists
      const validRole = guild.roles.cache
        .map(async (role) => {
          const {
            name
          } = role;

          if (suggestion.toLowerCase() === name.toLowerCase()) {
            await member.guild.channels
              .cache
              .get(suggestRoleChannel)
              .send(`Role already exists. You can add it in <#${changeRoleChannel}>.`);
            return true;
          }
          return false;
        });

      // If it does not exist, accept suggestion
      if (!validRole.includes(true)) { // If the role exists
        await message
          .reply(`suggested role ${suggestion} received.`);

        const m = await guild.channels
          .cache
          .get(roleRequestChannel)
          .send(suggestion);

        await m.react('😁');
        await m.react('❌');
      }

      await message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
