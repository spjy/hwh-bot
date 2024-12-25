import Discord, { SlashCommandBuilder } from 'discord.js';
import logger from '../logger';
import { ICommand, SlashCommand } from '../types/typedefs';

/** Upon /ask, sends an embed in the channel containing tip */
/** Optionally can provide a user to ping with the embed */
export default class Ask implements ICommand {
  readonly command: SlashCommand = new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Send tip letting users know to just ask their question')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to be notified'),
    );

  async execute(interaction: Discord.CommandInteraction) {
    const { client, options } = interaction;

    // User to be pinged
    const user = options.get('user') ? `${options.get('user').user}` : null;
    const tip: Discord.EmbedBuilder = new Discord.EmbedBuilder({
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

    await logger.debug(`/ask: Sending ask tip, pinging user "${user}"`);

    await interaction.reply({
      content: user,
      embeds: [tip],
    });
  }
}
