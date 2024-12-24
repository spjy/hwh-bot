import Discord, { SlashCommandBuilder } from 'discord.js';
import { SlashCommand, ICommand } from '../types/typedefs';
import logger from '../logger';

/**
 * Command to handle challenge submissions
 */
export default class Submit implements ICommand {
  readonly command: SlashCommand = new SlashCommandBuilder()
    .setName('submit')
    .setDescription('Submit')
    .addStringOption((option) =>
      option
        .setName('challenge_id')
        .setDescription(
          'ID for the challenge you want to submit to (e.g. ECP2-47)'
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('url').setDescription('URL to your work').setRequired(true)
    );

  async execute(interaction: Discord.ChatInputCommandInteraction) {
    const { guild, user, options } = interaction;

    await logger.trace('Executing /submit slash command');

    const challengeId = options.getString('challenge_id');
    const url = options.getString('url');

    await logger.debug(
      `/submit: Sending challenge submission ${challengeId} with body ${url}`
    );

    try {
      await (<Discord.TextChannel>(
        guild.channels.cache.get(process.env.BOT_MESSAGES_CHANNEL_ID)
      )).send({
        content: `[Challenge Entry for ${challengeId} from ${user}] ${url}`,
        // files: attachments.map((a) => a.url)
      });
    } catch (error) {
      await interaction.reply({
        content: 'Submission was not saved successfully. Please try again.',
        ephemeral: true,
      });

      await logger.error(
        error,
        '/submit: Could not send challenge submission to bot message channel.'
      );

      return;
    }

    await interaction.reply({
      content: `Thank you for participating in our event! You have submitted <${url}> for challenge ${challengeId}.`,
      ephemeral: true,
    });
  }
}
