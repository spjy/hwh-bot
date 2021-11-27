import Discord from 'discord.js';

export interface MentionStore {
  channel: string,
  message: string,
  cooldownDate: Date,
  mention: Discord.Role,
  attachment: string
}
