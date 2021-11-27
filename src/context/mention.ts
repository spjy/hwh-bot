import Discord from 'discord.js';
import { ContextMenuCommandBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from 'discord-api-types/v9';

import { MentionStore } from '../typedefs';

export default class Mention {
  data: any = new ContextMenuCommandBuilder()
    .setName('Mention')
    .setType(ApplicationCommandType.Message);
  
  async execute(interaction: Discord.ContextMenuInteraction, helpMentions: Discord.Collection<string, MentionStore>) {
    const { channel, options, user } = interaction;

    const message = options.getMessage('Mention');

    helpMentions.set(user.id, {
      channel: channel.id,
      message: message.content,
      cooldownDate: null,
      mention: null,
      attachment: null
    });
  }
}