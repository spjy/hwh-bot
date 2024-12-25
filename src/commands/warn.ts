require('dotenv-extended').load();
import Discord, {
  Embed,
  ActionRowBuilder,
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  EmbedBuilder,
  TextInputComponent,
} from 'discord.js';

import { SlashCommand } from '../types/typedefs';

const applicationCommandType = ApplicationCommandType.User as number;

export default class Warn {
  readonly command: SlashCommand = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('User to be reported')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('details')
        .setDescription('Details describing what you are reporting')
        .setRequired(true)
    );

  readonly context: ContextMenuCommandBuilder = new ContextMenuCommandBuilder()
    .setName('warn')
    .setType(applicationCommandType);

  modal: ModalBuilder = new ModalBuilder()
    .setCustomId('warn::0')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('warn::user')
          .setLabel('User (Do not modify)')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('User')
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('warn::reason')
          .setLabel('Reason')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Reason')
      )
    );

  async execute(interaction: Discord.CommandInteraction) {
    const { client, options } = interaction;

    await interaction.reply('Not yet implemented.');
  }

  async executeContextMenu(interaction: Discord.ContextMenuCommandInteraction) {
    const { channel: textChannel, options, user } = interaction;

    const warnee = options.get('user');

    const modal = this.modal.setTitle(`Warn ${warnee.user.tag}`);

    modal.components[0].components[0].setValue(warnee.user.id);

    interaction.showModal(modal);
  }

  async executeModalSubmit(interaction: Discord.ModalSubmitInteraction) {
    const { guild, channel, fields } = interaction;

    const user = fields.getTextInputValue('warn::user');
    const reason = fields.getTextInputValue('warn::reason');

    const warning = new EmbedBuilder()
      .setTitle('Warning')
      .setColor(16645888)
      .setDescription(`<@${user}> was warned by a staff member.`)
      .addFields({
        name: 'Reason',
        value: reason,
      })
      .setTimestamp();

    await (<Discord.TextChannel>guild.channels.cache.get(channel.id)).send({
      embeds: [warning],
    });

    interaction.reply({
      content: 'Sent warning.',
      ephemeral: true,
    });
  }
}
