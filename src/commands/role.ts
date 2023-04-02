// @ts-nocheck
require('dotenv-extended').load();
import Discord, {
  SlashCommandBuilder,
  MessageActionRow,
  MessageSelectMenu,
} from 'discord.js';
import logger from '../logger';

import roles from '../roles';

import { ICommand } from '../types/typedefs';

export default class Role implements ICommand {
  readonly command: SlashCommandBuilder = new SlashCommandBuilder()
    .setDefaultMemberPermission(false)
    .setName('role')
    .setDescription('Send available select menus for role selection');

  async execute(interaction: Discord.CommandInteraction) {
    const { channel } = interaction;

    await interaction.reply({ content: 'hath been senterino' });

    // Send roles based on structure from src/roles.ts
    for (let role in roles) {
      let row;

      if (role === 'Education') {
        row = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId('role::0')
            .setPlaceholder(`Select ${role} role`)
            .addOptions([
              {
                emoji: '❌',
                label: 'No Roles',
                description: 'Clear all roles in this category',
                value: 'clear',
              },
              ...roles[role],
            ])
        );
      } else {
        row = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setMinValues(1)
            .setMaxValues(roles[role].length)
            .setCustomId('role::0')
            .setPlaceholder(`Select ${role} role`)
            .addOptions([
              {
                emoji: '❌',
                label: 'No Roles',
                description: 'Clear all roles in this category',
                value: 'clear',
              },
              ...roles[role],
            ])
        );
      }

      await logger.trace(`/roles: Sending role select menus for ${role}`);

      try {
        await (<Discord.TextChannel>channel).send({
          content: `**${role}**`,
          components: [row],
        });
      } catch (error) {
        await logger.error(
          error,
          `/roles: Could not send select menu for ${role}`
        );
      }
    }
  }

  async executeMenu(interaction: Discord.SelectMenuInteraction, id: Number) {
    const { component, guild, user, values } = interaction;

    await interaction.deferReply({
      ephemeral: true,
    });

    const addedRoles: string[] = [];
    const removedRoles: string[] = [];
    const erroredRoles: string[] = [];

    const c = <Discord.MessageSelectMenu>component;

    await logger.debug(`Modifying roles for user ${user.id}`);

    // Add roles
    await Promise.all(
      c.options.map(async ({ value: role }) => {
        // Skip clear value
        if (role !== 'clear') {
          // Selected role
          const r = guild.roles.cache.find((r) => r.name === role);

          // User to receive role
          const u = guild.members.cache.get(user.id);

          // If user doesn't have role and it's on the list to add, add it
          // If user has role and it's not on the list to add, remove it
          if (!u.roles.cache.has(r.id) && values.includes(role)) {
            try {
              await u.roles.add(r);
            } catch (error) {
              erroredRoles.push(r.name);

              await logger.error(
                error,
                `Could not add role ${r} for user ${user.id}`
              );
            }

            addedRoles.push(r.name);
          } else if (
            u.roles.cache.has(r.id) &&
            (!values.includes(role) || values.includes('clear'))
          ) {
            try {
              await u.roles.remove(r);
            } catch (error) {
              erroredRoles.push(r.name);

              await logger.error(
                error,
                `Could not remove role ${r} for user ${user.id}`
              );
            }
            removedRoles.push(r.name);
          }
        }
      })
    );

    // Construct message
    let message = '**Role Changes**\n';

    if (addedRoles.length > 0) {
      message += `You have **added** the following roles:\n${addedRoles.join(
        '\n'
      )}\n\n`;
    }

    if (removedRoles.length > 0) {
      message += `You have **removed** the following roles:\n${removedRoles.join(
        '\n'
      )}`;
    }

    if (erroredRoles.length > 0) {
      message += `Due to an error, could not modify the following roles:\n${erroredRoles.join(
        '\n'
      )}`;
    }

    await interaction.editReply({
      content: message,
    });
  }
}
