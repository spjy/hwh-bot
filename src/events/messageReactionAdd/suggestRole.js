const Raven = require('raven');

module.exports = {
  description: 'Suggest role approval in #role-request',
  async execute(reaction, user, suggestRoleChannel, roleRequestChannel) {
    try {
      const {
        cleanContent: content,
        message,
        guild,
        emoji
      } = reaction;

      const { channels } = guild;

      // Igonore addition of own emoji.
      if (message.client.user.id !== user.id) {
        // Listen for addition of X or grin emoji to message.
        if (emoji.name === '😁') {
          await guild
            .createRole({
              name: content,
              color: 9807270,
              mentionable: true
            });

          await message
            .delete();

          await channels
            .get(roleRequestChannel)
            .send(`Added ${content} role.`);

          await channels
            .get(suggestRoleChannel)
            .send(`Suggested role ${content} was approved.`);
        } else if (emoji.name === '❌') {
          await message
            .delete();

          await channels
            .get(roleRequestChannel)
            .send(`Rejected '${content}' role.`);

          await channels
            .get(suggestRoleChannel)
            .send(`Suggested role ${content} was not approved.`);
        }
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
