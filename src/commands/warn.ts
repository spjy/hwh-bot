require('dotenv-extended').load();
import Discord, {
  MessageEmbed,
  Modal,
  TextInputComponent,
  MessageActionRow,
} from 'discord.js';
import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';

import { SlashCommand } from '../types/typedefs';

export default class Warn {
  readonly command: SlashCommand = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Attract attention to your question to receive help')
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
    .setType(ApplicationCommandType.User);

  modal: Modal = new Modal()
    .setCustomId('warn::0')
    .addComponents([
      new MessageActionRow().addComponents(
        new TextInputComponent()
          .setCustomId('warn::user')
          .setLabel('User (Do not modify)')
          .setStyle('SHORT')
          .setPlaceholder('User')
      ),
      new MessageActionRow().addComponents(
        new TextInputComponent()
          .setCustomId('warn::reason')
          .setLabel('Reason')
          .setStyle('PARAGRAPH')
          .setPlaceholder('Reason')
      ),
    ]);

  async executeContextMenu(interaction: Discord.ContextMenuInteraction) {
    const { channel: textChannel, options, user } = interaction;

    const warnee: Discord.GuildMember = <Discord.GuildMember>(
      options.getMember('user')
    );

    const modal = this.modal.setTitle(`Warn ${warnee.user.tag}`);

    modal.components[0].components[0].setValue(warnee.id);

    interaction.showModal(modal);
  }

  async executeModalSubmit(interaction: Discord.ModalSubmitInteraction) {
    const { guild, channel, fields } = interaction;

    const user = fields.getTextInputValue('warn::user');
    const reason = fields.getTextInputValue('warn::reason');

    const warning = new MessageEmbed()
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
