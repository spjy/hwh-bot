require('dotenv-extended').load();
import Discord, { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

import roles from '../../roles';

export default class Role {
	data: any 
    
  constructor() {
    this.data = new SlashCommandBuilder()
    .setName('role')
      .setDescription('role')
  }

  async execute(interaction) {
    const { guild } = interaction;

    await interaction.reply({ content: 'hath been senterino' });

    for (let role in roles) {
      let row;

      if (role === 'Education') {
        row = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
              .setCustomId('role::0')
              .setPlaceholder(`Select ${role} role`)
              .addOptions([
                {
                  emoji: '❌',
                  label: 'No Roles',
                  description: 'Clear all roles in this category',
                  value: 'clear'
                },
                ...roles[role]
              ]),
          );
      } else {
        row = new MessageActionRow()
          .addComponents(
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
                  value: 'clear'
                },
                ...roles[role]
              ]),
          );
      }

      await (<Discord.TextChannel>guild.channels
        .cache
        .get(process.env.CHANGE_ROLE_CHANNEL_ID))
        .send({
          content: `**${role}**`,
          components: [row]
        });
    }
  }

  async executeMenu(interaction: Discord.MessageComponentInteraction, id: Number) {
    const { component, guild, user, values } = interaction;

    const addedRoles = [];
    const removedRoles = [];

    const c = <Discord.MessageSelectMenu>(component);

    // Add roles
    await Promise.all(c.options.map(async ({ value: role }) => {
      // Skip clear value
      if (role !== 'clear') {
        // Selected role 
        const r = guild.roles.cache.find((r) => r.name === role)
  
        // User to receive role
        const u = guild.members.cache.get(user.id);
  
        // If user doesn't have role and it's on the list to add, add it
        // If user has role and it's not on the list to add, remove it
        if (!u.roles.cache.has(r.id) && values.includes(role)) {
          await u.roles.add(r);
          addedRoles.push(r);
        } else if (u.roles.cache.has(r.id) && (!values.includes(role) || values.includes('clear'))) {
          await u.roles.remove(r);
          removedRoles.push(r);
        }
      }
    }))

    // Construct message
    let message = '**Role Changes**\n'

    if (addedRoles.length > 0) {
      message += `You have **added** the following roles:\n${addedRoles.join('\n')}\n\n`
    }

    if (removedRoles.length > 0) {
      message += `You have **removed** the following roles:\n${removedRoles.join('\n')}`
    }

    interaction.reply({
      content: message,
      ephemeral: true,
    })
  }
}