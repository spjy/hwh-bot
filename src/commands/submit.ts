import Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default class Submit {
  command: any = new SlashCommandBuilder()
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

  async execute(interaction: Discord.CommandInteraction) {
    const { guild, user, options } = interaction;

    const challengeId = options.getString('challenge_id');
    const url = options.getString('url');

    await (<Discord.TextChannel>(
      guild.channels.cache.get(process.env.BOT_MESSAGES_CHANNEL_ID)
    )).send({
      content: `[Challenge Entry for ${challengeId} from ${user}] ${url}`,
      // files: attachments.map((a) => a.url)
    });

    await interaction.reply({
      content: `Thank you for participating in our event! You have submitted <${url}> for challenge ${challengeId}.`,
      ephemeral: true,
    });
  }
}
