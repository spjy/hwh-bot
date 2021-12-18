require('dotenv-extended').load();
import Discord, { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder, ContextMenuCommandBuilder, channelMention } from "@discordjs/builders";
import { ApplicationCommandType } from 'discord-api-types/v9';

import { MentionStore } from '../typedefs';

export default class Report {
  command: any = new SlashCommandBuilder()
    .setName('mention')
    .setDescription('Attract attention to your question to receive help')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a mention key to use in 10 minutes')
        .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('overwrite')
        .setDescription('Overwrite currently generated mention key with new role and message')
        .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned')))
    .addSubcommand(subcommand =>
      subcommand
        .setName('send')
        .setDescription('Send your created mention in your specified channel'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('cancel')
        .setDescription('Cancel currently created mention'));

  context: ContextMenuCommandBuilder = new ContextMenuCommandBuilder()
    .setName('mention')
    .setType(ApplicationCommandType.Message);

  permissions: Discord.ApplicationCommandPermissionData[] = [
    {
      id: process.env.MENTION_BAN_ROLE_ID,
      type: 'ROLE',
      permission: false,
    }
  ]

  async createMention(interaction: Discord.CommandInteraction, helpMentions: Discord.Collection<string, MentionStore>, mention: Discord.Role) {
    const {
      channel: textChannel,
      user,
      guild,
      client
    } = interaction;

    const channel = <Discord.TextChannel>textChannel;
    const helpMention = helpMentions.get(user.id);

    let mentionChannel: string, mentionMessage: Discord.Message, mentionCooldown: Date = new Date(Date.now() + 600000);

    // If channel and message already selected with select menu.
    if (helpMention && helpMention.channel && helpMention.message) {
      mentionChannel = helpMention.channel;
      mentionMessage = helpMention.message;
    } else { // otherwise look for last message sent in the channel by the user
      // fetch last 50 messages in the channel with the message was sent
      const messages = await channel.messages.fetch();
  
      // get second oldest message from user
      const question = messages.filter(m => m.author.id === user.id).toJSON()[0];

      // If question found, react and have user confirm
      if (question) {
        await question
          .react('✅');
    
        await interaction
          .editReply({
            content: `I have reacted to [this message](<${question.url}>), which will be mentioned. Once you confirm that it includes a specific, answerable question, react with the checkmark to generate the key.`,
          });
    
        await question
          .awaitReactions({ filter: (reaction, user) => reaction.emoji.name === '✅' && user.id === user.id, max: 1 });

        mentionChannel = question.channelId;
        mentionMessage = question;
      } else {
        await interaction.editReply({
          content: 'You have not sent a message recently. Try send your question and re-try this command.'
        });

        return;
      }
    }

    helpMentions.set(user.id, {
      channel: mentionChannel,
      message: mentionMessage,
      cooldownDate: mentionCooldown,
      mention: mention
    });

    const success = new MessageEmbed({
      title: 'Mention Created',
      description: `Successfully created a key for [this message](${mentionMessage.url}) in <#${channel.id}> for ${mention}.`,
      timestamp: mentionCooldown,
      footer: {
        iconURL: client.user.avatarURL(),
        text: 'Mentionable at'
      }
    })

    await (<Discord.TextChannel>guild.channels
      .cache
      .get(channel.id))
      .send({
        embeds: [success]
      });

    await interaction.editReply({
      content: `Type \`/mention send\` at <t:${Math.round((mentionCooldown).getTime() / 1000)}:t> to use this mention.`
    })

    await (<Discord.TextChannel>guild.channels
      .cache
      .get(process.env.MENTION_LOG_CHANNEL_ID))
      .send(`<@${user.id}> created mention for ${mentionMessage.url}`);
  }

  async sendMention(interaction: Discord.CommandInteraction, helpMentions: Discord.Collection<string, MentionStore>, helpMention: MentionStore) {
    const {
      guild,
      client,
      user
    } = interaction;

    const {
      channel: helpChannel,
      cooldownDate: helpDate,
      mention: helpUserMention,
      message: helpMessage,
    } = helpMention;

    if (Date.now() >= helpDate) { // cooldown has elapsed
      // Create message embed
      const fields = [];

      // 1024 char limit for fields & 2000 char limit for messages
      // put overflow message in another field
      if (helpMessage.content.length > 0) {
        if (helpMessage.content.length <= 1024) {
          fields.push({
            // Empty title
            name: '\u200B',
            value: helpMessage.content
          });
        } else {
          fields.push(
            {
              name: '\u200B',
              value: helpMessage.content.substr(0, 1024)
            },
            {
              name: '\u200B',
              value: helpMessage.content.substr(1024, helpMessage.content.length - 1)
            }
          );
        }
      }

      const m = new MessageEmbed({
        title: 'Mention',
        description: `<@${user.id}>:`,
        fields: fields,
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help'
        }
      });

      // Send help mention to channel
      const h = await (<Discord.TextChannel>guild.channels
        .cache
        .get(helpChannel))
        .send({
          content: `${helpUserMention}`,
          embeds: [m],
          ...(helpMessage.attachments && helpMessage.attachments.toJSON().length > 0) && { files: helpMessage.attachments.toJSON() }
        });

      // Reset collection
      helpMentions.set(user.id, undefined);

      // Log in channel
      await (<Discord.TextChannel>guild.channels
        .cache
        .get(process.env.MENTION_LOG_CHANNEL_ID))
        .send(`<@${user.id}> sent mention in <#${helpChannel}>. ${h.url}`);

      await interaction.editReply({
        content: 'Sent!'
      });
    } else if (Date.now() <= helpDate) {
      // Send error
      await interaction.editReply({
        content: `The cooldown time (10 minutes) has not elapsed yet.\n\nTry at <t:${Math.round((helpDate).getTime() / 1000)}:t>.`,
      });
    }
  }

  async executeContextMenu(interaction: Discord.ContextMenuInteraction, helpMentions: Discord.Collection<string, MentionStore>) {
    const { channel: textChannel, options, user } = interaction;

    const channel = <Discord.TextChannel>textChannel;

    // Allow mentions only in help categories
    if (!channel.parent.name.toLowerCase().endsWith('help')) {
      await interaction.reply({
        content: 'You can only use mentions in help channels.',
        ephemeral: true,
      });

      return;
    }

    const message = options.getMessage('message');

    if (!(user.id === message.author.id)) {
      await interaction.reply({
        content: `You must select a message that you sent. [This message](${message.url}) was not sent by you.`,
        ephemeral: true
      });

      return;
    }

    await interaction.reply({
      content: `Selected [this message](${message.url}) to be mentioned.\n\nAfter confirming that it includes a specific, answerable question, use \`/mention create\` in this channel to specify role.`,
      ephemeral: true
    })

    helpMentions.set(user.id, {
      channel: channel.id,
      message: message,
      ...helpMentions.get(user.id)
    });
  }

  async execute(interaction: Discord.CommandInteraction, helpMentions: Discord.Collection<string, MentionStore>) {
    const { guild, options, user, channel: textChannel } = interaction;

    await interaction.deferReply({
      ephemeral: true
    });

    const channel = <Discord.TextChannel>textChannel;

    // Retrieve stored helpMention according to user ID
    const helpMention: MentionStore = helpMentions.get(user.id);

    // Allow mentions only in help categories
    if (!channel.parent.name.toLowerCase().endsWith('help')) {
      await interaction.editReply({
        content: 'You can only use mentions in help channels.',
      });

      return;
    }

    if (options.getSubcommand() === 'create') {
      let mention: Discord.Role;

      // Retrieve role, or if not provided, retrieve the channel name and ping that
      if (options.getRole('role')) {
        mention = <Discord.Role>options.getRole('role');
      } else {
        // Remove number in channel name (e.g. math-2)
        // and replace dashes with spaces to get role name
        mention = guild.roles.cache
          .find(({ name }) => name.toLowerCase() === channel.name.replace(/-[a-z]$/, '').replace(/-/g, ' ').toLowerCase());
      }
      
      // Error if could not find role to mention
      if (!mention || mention.color !== 9807270) {
        await interaction.editReply({
          content: 'Provided role does not exist or cannot be mentioned.'
        });

        return;
      }

      // If already have a mention, error (if helpMention not yet created OR mention not yet specified yet)
      // Could have selected channel/message
      if (helpMention && helpMention.mention) {
        await interaction.editReply({
          content: 'You already have a mention created. Use `/mention overwrite` to create a new one.',
        });

        return;
      }

      await this.createMention(interaction, helpMentions, mention);
    } else if (options.getSubcommand() === 'overwrite') {
      let mention: Discord.Role;

      // Retrieve role, or if not provided, retrieve the channel name and ping that
      if (options.getRole('role')) {
        mention = <Discord.Role>options.getRole('role');
      } else {
        // Remove number in channel name (e.g. math-2)
        // and replace dashes with spaces to get role name
        mention = guild.roles.cache
          .find(({ name }) => name.toLowerCase() === channel.name.replace(/-[a-z]$/, '').replace(/-/g, ' ').toLowerCase());
      }
      
      // Error if could not find role to mention
      if (!mention || mention.color !== 9807270) {
        await interaction.editReply({
          content: 'Provided role does not exist or cannot be mentioned.',
        });

        return;
      }

      await this.createMention(interaction, helpMentions, mention);
    } else if (options.getSubcommand() === 'send') {
      // If help mention not created yet
      // If channel selected or not with context menu
      if (!helpMention || !helpMention.mention) {
        await interaction.editReply({
          content: 'You do not have any mention keys created. To create one, use `/mention create`.'
        });

        return;
      }

      await this.sendMention(interaction, helpMentions, helpMention);
    } else if (options.getSubcommand() === 'cancel') {
      // If help mention not created yet
      // If channel selected or not with context menu
      if (!helpMention || !helpMention.mention) {
        await interaction.editReply({
          content: 'You do not have any mention keys created. To create one, use `/mention create`.'
        });

        return;
      }

      // Specify which mention was deleted by channel, and clear help mention collection for user
      const deletedMentionChannel = helpMention.channel;
      await helpMentions.set(user.id, undefined);

      await interaction.editReply({
        content: `Your generated key for <#${deletedMentionChannel}> has been cancelled.`,
      });
    }
  }
}