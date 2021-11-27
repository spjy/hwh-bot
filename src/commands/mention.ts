require('dotenv-extended').load();
import Discord, { MessageEmbed } from 'discord.js';
import Mention from '../events/message/mention';
const { SlashCommandBuilder } = require('@discordjs/builders');

import { MentionStore } from '../typedefs';

export default class Report {
  data: any
  permissions: Discord.ApplicationCommandPermissionData[] = [
    {
      id: process.env.MENTION_BAN_ROLE_ID,
      type: 'ROLE',
      permission: false,
    }
  ]
    
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('Mention')
      .setDescription('Attract attention to your question to receive help')
      .addSubcommand(subcommand =>
        subcommand
          .setName('create')
          .setDescription('Create a mention key to use in 15 minutes')
          .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned')))
      .addSubcommand(subcommand =>
        subcommand
          .setName('overwrite')
          .setDescription('Overwrite currently generated mention key with new role and message')
          .addRoleOption(option => option.setName('role').setDescription('Role to be mentioned')))
      .addSubcommand(subcommand =>
        subcommand
          .setName('send')
          .setDescription('Mention your selected message'))
      .addSubcommand(subcommand =>
        subcommand
          .setName('cancel')
          .setDescription('Cancel current mention'))
  }

  async createMention(interaction: Discord.CommandInteraction, helpMentions, mention: Discord.Role) {
    const {
      channel: textChannel,
      user,
      guild,
      client
    } = interaction;

    const channel = <Discord.TextChannel>textChannel;

    // fetch last 50 messages in the channel with the message was sent
    const messages = await channel.messages.fetch();

    // get second oldest message from user
    const question = messages.filter(m => m.author.id === user.id).toJSON()[1];

    // If message is found, put a checkmark to confirm
    if (question) {
      const text = question.content; // get second oldest message content
      const attachment = question.attachments.toJSON(); // get attachments if there are any

      // If valid role, add to help mentions collection
      if (mention) {
        helpMentions.set(user.id, {
          channel: channel.id,
          message: text,
          cooldownDate: new Date(Date.now() + 600000),
          mention: mention,
          attachment: attachment.length === 1 ? attachment[0].url : null
        });

        await question
          .react('✅');

        await interaction
          .reply({
            content: `${client.user.id} has reacted to the message that will be mentioned. Once you confirm that it includes a specific, answerable question, react with the checkmark to generate the key.`,
            ephemeral: true
          });

        await question
          .awaitReactions({ filter: (reaction, user) => reaction.emoji.name === '✅' && user.id === user.id, max: 1 });

        await interaction.deleteReply();

        const success = new MessageEmbed({
          title: 'Mention Created',
          description: `Successfully created a key for [this message](${question.url}).\n\n`
            + 'Type `?mention send` in ten (10) minutes to mention <@&' + mention + '> in <#' + channel.id + '>.',
          timestamp: new Date(Date.now() + 600000),
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
      }
    }
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
      attachment: helpAttachment
    } = helpMention;

    if (Date.now() >= helpDate) { // cooldown has elapsed
      // Create message embed
      const fields = [];

      // 1024 char limit for fields & 2000 char limit for messages
      // put overflow message in another field
      if (!(helpMessage.length > 1024)) {
        fields.push({
          // Empty title
          name: '\u200B',
          value: helpMessage.substr(0, helpMessage.length - 1)
        });
      } else {
        fields.push(
          {
            name: '\u200B',
            value: helpMessage.substr(0, 1024)
          },
          {
          name: '\u200B',
          value: helpMessage.substr(1024, helpMessage.length - 1)
          }
        );
      }

      const m = new MessageEmbed({
        title: 'Mention',
        description: `<@${user.id}>`,
        fields: fields,
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help'
        }
      });

      // Send help mention to channel
      await (<Discord.TextChannel>guild.channels
        .cache
        .get(helpChannel))
        .send({
          content: helpUserMention,
          embeds: [m],
          files: [helpAttachment]
        });

      // Reset collection
      helpMentions.set(user.id, undefined);

      // Log in channel
      await (<Discord.TextChannel>guild.channels
        .cache
        .get(process.env.MENTION_LOG_CHANNEL_ID))
        .send(`<@${user.id}> sent mention in <#${helpChannel}>`);
    } else if (Date.now() <= helpDate) {
      // Send error
      await interaction.reply({
        content: `The cooldown time (10 minutes) has not elapsed yet.\n\nTry again at <t:${Math.round((helpDate).getTime() / 1000)}:t>.`,
        ephemeral: true
      });
    }
  }

  async execute(interaction: Discord.CommandInteraction, helpMentions: Discord.Collection<string, MentionStore>) {
    const { guild, options, user, channel: textChannel } = interaction;

    const channel = <Discord.TextChannel>textChannel;

    // Retrieve stored helpMention according to user ID
    const helpMention: MentionStore = helpMentions.get(user.id);

    // Allow mentions in help categories
    if (!channel.parent.name.toLowerCase().endsWith('help')) {
      await interaction.reply({
        content: 'You can only use mentions in help channels.',
        ephemeral: true
      });

      return;
    }

    if (options.getSubcommand() === 'create') {
      let mention: Discord.Role;

      if (options.getRole('role')) {
        mention = <Discord.Role>options.getRole('role');
      } else {
        // Remove number in channel name (e.g. math-2)
        // and replace dashes with spaces to get role name
        mention = guild.roles.cache
          .find(({ name }) => name.toLowerCase() === channel.name.replace(/-[a-z]$/, '').replace(/-/g, ' ').toLowerCase());
      }
      
      if (!mention || mention.color !== 9807270) {
        interaction.reply({
          content: 'Provided role does not exist or cannot be mentioned.'
        });

        return;
      }

      // If already have a mention
      if (helpMention !== null) {
        interaction.reply({
          content: 'You already have a mention created. Use `/mention overwrite` to create a new one.',
          ephemeral: true
        });

        return;
      }

      this.createMention(interaction, helpMentions, mention);
    } else if (options.getSubcommand() === 'overwrite') {
      let mention: Discord.Role;

      if (options.getRole('role')) {
        mention = <Discord.Role>options.getRole('role');
      } else {
        // Remove number in channel name (e.g. math-2)
        // and replace dashes with spaces to get role name
        mention = guild.roles.cache
          .find(({ name }) => name.toLowerCase() === channel.name.replace(/-[a-z]$/, '').replace(/-/g, ' ').toLowerCase());
      }
      
      if (!mention || mention.color !== 9807270) {
        interaction.reply({
          content: 'Provided role does not exist or cannot be mentioned.'
        });

        return;
      }

      this.createMention(interaction, helpMentions, mention);
    } else if (options.getSubcommand() === 'send') {
      await this.sendMention(interaction, helpMentions, helpMention);
    } else if (options.getSubcommand() === 'cancel') {
      const deletedMention = helpMention;
      await helpMentions.set(user.id, undefined);

      await interaction.reply({
        content: `Your generated key for ${deletedMention.channel} has been cancelled.`,
        ephemeral: true
      });
    }
  }
}