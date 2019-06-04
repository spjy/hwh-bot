const Raven = require('raven');

/**
 * Send an embed to a specified channel.
 * @param {Object} params - The message being sent.
 * @param {Object} params.message - The message being sent.
 * @param {Number} params.color - The color of the side of the embed.
 * @param {string} params.title - The title of the embed (at the very top).
 * @param {string} [params.description = ''] - The description of the embed (after the title).
 * @param {Array} params.fields - The fields of the embed.
 * @param {string} [params.footer = 'Homework Help Bot'] - The message at the footer of the embed.
 * @param {string} [params.channelToSend = ''] - The channel to send the embed.
 * @param {string} [params.preembed = ''] - Content before the mention.
 */

export default class Embed {
  constructor({
    message,
    color,
    title,
    description = '',
    fields,
    footer = 'Homework Help Bot',
    channelToSend = '',
    preembed = ''
  } = {}) {
    const {
      channel,
      guild
    } = message;

    this.message = message;

    this.content = {
      embed: {
        color: color,
        author: {
          name: title
        },
        description: description,
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.avatarURL,
          text: footer
        }
      }
    };

    this.channel = channel;
    this.guild = guild;
    this.channelToSend = channelToSend;
    this.preembed = preembed;
  }

  /**
   * Sets the preembed value.
   * @param {string} preembed
   */
  setPreembed(preembed) {
    this.preembed = preembed;
  }

  /**
   * Sets the title value.
   * @param {string} title
   */
  setTitle(title) {
    this.content.embed.author.name = title;
  }

  /**
   * Sets the description value.
   * @param {string} description
   */
  setDescription(description) {
    this.content.embed.description = description;
  }

  /**
   * Sets the fields value.
   * @param {Array} fields
   */
  setFields(fields) {
    this.content.embed.fields = fields;
  }

  /**
   * Sets the footer value.
   * @param {string} footer
   */
  setFooter(footer) {
    this.content.embed.footer.text = footer;
  }

  /**
   * Method to send the embed to the current channel of instantiation.
   */
  async sendToCurrentChannel() {
    try {
      await this.channel
        .send(
          this.preembed,
          this.content
        );

      await this.message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }

  /**
   * Method to send the embed to a specified channel.
   */
  async sendToDifferentChannel() {
    try {
      await this.guild.channels
        .get(this.channelToSend)
        .send(
          this.preembed,
          this.content
        );

      await this.message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
