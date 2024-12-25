import Discord, {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { SlashCommand } from './typedefs';

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
  reason: string;
  log: string[];
}

const applicationCommandTypeUser = ApplicationCommandType.User as number;

export default abstract class IDisciplinaryAction {
  command: SlashCommand;
  context: ContextMenuCommandBuilder;
  modal: ModalBuilder;

  constructor(action: string, actionPastTense: string) {
    this.command = new SlashCommandBuilder()
      .setName(action)
      .setDescription(`Action to ${action}`)
      .addUserOption((option) =>
        option
          .setName('user')
          .setDescription(`User to be ${actionPastTense}`)
          .setRequired(true),
      )
      .addStringOption((option) =>
        option
          .setName('reason')
          .setDescription(`Reason for user to be ${actionPastTense}`)
          .setRequired(true),
      );

    this.context = new ContextMenuCommandBuilder()
      .setName(action)
      .setType(applicationCommandTypeUser);

    const userInput = new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(`${action}::user`)
        .setLabel('User (Do not modify)')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('User'),
    );
    const reasonInput = new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(`${action}::reason`)
        .setLabel('Reason')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Reason'),
    );

    this.modal = new ModalBuilder()
      .setCustomId(`${action}::0`)
      .addComponents(userInput, reasonInput);
  }

  abstract save(action: disciplinaryAction): Promise<void>;
  abstract modify(): Promise<void>;
  abstract delete(): Promise<void>;
  abstract log(): Promise<void>;
}
