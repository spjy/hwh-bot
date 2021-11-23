require('dotenv-extended').load();
import Discord, { MessageEmbed } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class Report {
  data: any
  permissions: Discord.ApplicationCommandPermissionData[] = [
    {
      id: process.env.MENTION_BAN_ROLE_ID,
      type: 'ROLE',
      permission: false,
    }
  ]
    
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('mention')
      .setDescription('Mention')
      .addSubcommand(subcommand =>
        subcommand
          .setName('send')
          .setDescription('Mention your selected message')
          .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned').setRequired(true)))
      .addSubcommand(subcommand =>
        subcommand
          .setName('cancel')
          .setDescription('Cancel current mention'));
  }

  async execute(interaction) {
    interaction.reply({ content: 'mention' });
  }
}