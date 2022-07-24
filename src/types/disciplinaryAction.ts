// @ts-nocheck
import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
} from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types';
import Discord, {
  MessageActionRow,
  Modal,
  TextInputComponent,
} from 'discord.js';
import { ICommand, SlashCommand } from './typedefs';

enum disciplinaryTypes {
  NOTE,
  WARN,
  MUTE,
  SOFTBAN,
  KICK,
  BAN,
}

interface disciplinaryAction {
  type: disciplinaryTypes;
  user: Discord.User;
  moderator: Discord.User;
  channel: Discord.TextChannel;
  reason: String;
  log: String[];
}

export default abstract class IDisciplinaryAction {
  command: SlashCommand;
  context: ContextMenuCommandBuilder;
  modal: Modal;

  constructor(action: string, actionPastTense: string) {
    this.command = new SlashCommandBuilder()
      .setName(action)
      .setDescription(`Action to ${action}`)
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription(`User to be ${actionPastTense}`)
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription(`Reason for user to be ${actionPastTense}`)
          .setRequired(true)
      );

    this.context = new ContextMenuCommandBuilder()
      .setName(action)
      .setType(ApplicationCommandType.User);

    this.modal = new Modal()
      .setCustomId(`${action}::0`)
      .addComponents([
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId(`${action}::user`)
            .setLabel('User (Do not modify)')
            .setStyle('SHORT')
            .setPlaceholder('User')
        ),
        new MessageActionRow().addComponents(
          new TextInputComponent()
            .setCustomId(`${action}::reason`)
            .setLabel('Reason')
            .setStyle('PARAGRAPH')
            .setPlaceholder('Reason')
        ),
      ]);
  }

  abstract save(action: disciplinaryAction): Promise<void>;
  abstract modify(): Promise<void>;
  abstract delete(): Promise<void>;
  abstract log(): Promise<void>;
}
