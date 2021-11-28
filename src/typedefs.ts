import Discord from 'discord.js';

export interface MentionStore {
  channel: string,
  message: Discord.Message,
  cooldownDate?: Date,
  mention?: Discord.Role,
}
