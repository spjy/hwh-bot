import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import Discord from 'discord.js';

export interface MentionStore {
  channel: string;
  message: Discord.Message;
  cooldownDate?: Date;
  mention?: Discord.Role;
}

export enum dispositions {
  NO_ACTION = 'no_action',
  NOTE = 'note',
  VERBAL_WARN = 'verbal_warn',
  FORMAL_WARN = 'formal_warn',
  MUTE = 'mute',
  KICK = 'kick',
  SOFTBAN = 'softban',
  BAN = 'ban',
}

export type SlashCommand =
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
  | SlashCommandSubcommandsOnlyBuilder;

/* Slash Command Interface */
export interface ICommand {
  readonly command: SlashCommand;
  execute(interaction: Discord.CommandInteraction): Promise<void>;
  execute(
    interaction: Discord.CommandInteraction,
    helpMentions: Discord.Collection<string, MentionStore>
  ): Promise<void>;
}

/* Context Menu Interface */
export interface IContextMenu {
  readonly context: ContextMenuCommandBuilder;
  executeContextMenu(
    interaction: Discord.ContextMenuInteraction,
    id: Number
  ): Promise<void>;
  executeContextMenu(
    interaction: Discord.ContextMenuInteraction,
    helpMentions: Discord.Collection<string, MentionStore>
  ): Promise<void>;
}
