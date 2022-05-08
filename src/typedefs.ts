import Discord from 'discord.js';

export interface MentionStore {
  channel: string,
  message: Discord.Message,
  cooldownDate?: Date,
  mention?: Discord.Role,
}

export enum dispositions {
  NO_ACTION = 'no_action',
  VERBAL_WARN = 'verbal_warn',
  FORMAL_WARN = 'formal_warn',
  MUTE = 'mute',
  KICK = 'kick',
  SOFTBAN = 'softban',
  BAN = 'ban'
}
