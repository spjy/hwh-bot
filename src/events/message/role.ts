import Discord from 'discord.js';
import Raven from 'raven';

/**
 * Handles role additions or subtractions for members.
 */
export default class Role {
  message: Discord.Message
  /**
   * @param {Object} message The message object instantiated by the user.
   */
  constructor(message) {
    this.message = message;
  }

  /**
   * The main function to run.
   */
  async execute() {
    try {
      const {
        content,
        guild,
        member,
        author
      } = this.message;

      // get first part of string (command)
      const command = content.slice(0, 1).toLowerCase();
      // get the rest of the string
      let selectedRole = content.slice(1).trim().toLowerCase();

      // replace dash with space if contained.
      if (selectedRole.includes('-')) {
        selectedRole = selectedRole.replace(/-/g, ' ');
      }

      // Run through roles and check stipulations
      const validRole = await Promise.all(guild.roles.cache
        .map(async (role) => {
          const {
            id,
            name,
            color
          } = role;

          // Ignore case
          const roleName = name.toLowerCase();

          // Check for valid roles
          if (selectedRole === roleName
            && (color === 9807270 // subject roles
            || roleName === 'post graduate'
            || roleName === 'graduate'
            || roleName === 'undergraduate'
            || roleName === 'high school'
            || roleName === 'pre high school'
            || roleName === 'independent'
            || roleName === 'advanced math')) {
            if (command === '+'
              && selectedRole === name.toLowerCase()) {
              if (member.roles.cache.has(id)) {
                await this.message
                  .reply(`error! You are already in the **${name}** role!`);
              } else {
                await guild.member(author.id)
                  .roles.add(id);

                await this.message
                  .reply(`you have added the **${name}** role!`);
              }
            } else if (command === '-'
              && selectedRole === name.toLowerCase()) {
              if (member.roles.cache.has(id)) {
                await guild.member(author.id)
                  .roles.remove(id);

                await this.message
                  .reply(`you have removed the **${name}** role!`);
              } else {
                await this.message
                  .reply(`error! You are not in the **${name}** role!`);
              }
            }
            return true;
          }
          return false;
        }));

      if (!validRole.includes(true)) { // If role exists
        await this.message
          .reply('invalid role. See the pins for a comprehensive list.');
      }
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
