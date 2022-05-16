import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';
import { ICommand, SlashCommand } from '../types/typedefs';

export default class Ask implements ICommand {
  readonly command: SlashCommand = new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Send tip letting users know to just ask their question')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to be notified')
    );

  async execute(interaction: Discord.CommandInteraction) {
    const { client, options } = interaction;

    const tip = new Discord.MessageEmbed({
      color: 1441536,
      title: 'Tip',
      description:
        "If you have a question, don't hesitate to ask it. To save time, " +
        'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: 'Homework Help Bot',
      },
    });

    await interaction.reply({
      content: options.getUser('user') ? `${options.getUser('user')}` : null,
      embeds: [tip],
    });
  }
}
