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
          .setName('create')
          .setDescription('Create a mention key to use in 15 minutes')
          .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned').setRequired(true)))
      .addSubcommand(subcommand =>
        subcommand
          .setName('overwrite')
          .setDescription('Overwrite currently generated mention key with new role and message')
          .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned').setRequired(true)))
      .addSubcommand(subcommand =>
        subcommand
          .setName('send')
          .setDescription('Mention your selected message'))
      .addSubcommand(subcommand =>
        subcommand
          .setName('cancel')
          .setDescription('Cancel current mention'))
  }

  async execute(interaction) {
    const { options, channel, message } = interaction;

    interaction.reply({ content: 'Mention command not yet implemented.' });

    // Allow mentions in help categories
    // if (!channel.parent.name.toLowerCase().endsWith('help')) {
    //   await interaction.reply({
    //     content: 'You can only use mentions in help channels.'
    //   });

    //   return;
    // }

    // if (options.getSubcommand() === 'create') {
    // } else if (options.getSubcommand() === 'overwrite') {
    // } else if (options.getSubcommand() === 'send') {
    //   const role = options.getRole('role');
    // } else if (options.getSubcommand === 'cancel') {
    // }
  }
}