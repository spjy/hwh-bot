const Raven = require('raven');

module.exports = {
  description: 'Role adding/removing in #change-role',
  async execute(message) {
    try {
      const {
        content,
        guild,
        member,
        author
      } = message;

      const command = content.slice(0, 1).toLowerCase(); // get first part of string (command)
      let selectedRole = content.slice(1).trim().toLowerCase(); // get the rest of the string

      if (selectedRole.includes('-')) {
        selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
      }

      // Run through roles and check stipulations
      const validRole = await Promise.all(guild.roles
        .map(async (role) => {
          const {
            id,
            name,
            color
          } = role;

          if (selectedRole === name.toLowerCase() && (color === 9807270
            || color === 16770276
            || color === 16760511
            || color === 16741498
            || color === 12713987
            || color === 9240581
            || color === 12596388)) {
            if (command === '+' && selectedRole === name.toLowerCase()) {
              if (member.roles.has(id)) {
                await message
                  .reply(`error! You are already in the **${name}** role!`);
              } else {
                await guild.member(author.id)
                  .addRole(id);

                await message
                  .reply(`you have added the **${name}** role!`);
              }
            } else if (command === '-' && selectedRole === name.toLowerCase()) {
              if (member.roles.has(id)) {
                await guild.member(author.id)
                  .removeRole(id);

                await message
                  .reply(`you have removed the **${name}** role!`);
              } else {
                await message
                  .reply(`error! You are not in the **${name}** role!`);
              }
            }
            return true;
          }
          return false;
        }));

      if (!validRole.includes(true)) { // If role exists
        await message
          .reply('invalid role. See the pins for a comprehensive list.')
          .catch(err => Raven.captureException(err));
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
