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

          const roleName = name.toLowerCase();

          if (selectedRole === roleName
            && (color === 9807270 // subject roles
            || roleName === 'post graduate'
            || roleName === 'graduate'
            || roleName === 'undergraduate'
            || roleName === 'high school'
            || roleName === 'pre high school'
            || roleName === 'independent')) {
            if (command === '+'
              && selectedRole === name.toLowerCase()) {
              if (member.roles.has(id)) {
                await message
                  .reply(`error! You are already in the **${name}** role!`);
              } else {
                await guild.member(author.id)
                  .addRole(id);

                await message
                  .reply(`you have added the **${name}** role!`);
              }
            } else if (command === '-'
              && selectedRole === name.toLowerCase()) {
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
          .reply('invalid role. See the pins for a comprehensive list.');
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
