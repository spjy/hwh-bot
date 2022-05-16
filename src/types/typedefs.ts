import {
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
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

/* Slash Command Interface */
export interface ICommand {
  readonly command: SlashCommandBuilder;
  execute(interaction: Discord.BaseCommandInteraction): Promise<void>;
  execute(
    interaction: Discord.BaseCommandInteraction,
    helpMentions: Discord.Collection<string, MentionStore>
  ): Promise<void>;
}

/* Context Menu Interface */
export interface IContextMenu extends ICommand {
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
