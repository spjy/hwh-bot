const Raven = require('raven');

/**
 * @description Send an embed to a specified channel.
 * @param {Object} message - The message being sent.
 * @param {Number} color - The color of the side of the embed.
 * @param {string} title - The title of the embed (at the very top).
 * @param {string} [description = ''] - The description of the embed (after the title).
 * @param {Array} fields - The fields of the embed.
 * @param {string} [footer = 'Homework Help Bot'] - The message at the footer of the embed.
 * @param {string} [channelToSend = ''] - The channel to send the embed.
 * @param {string} [preembed = ''] - Content before the mention.
 */

export default class Embed {
  constructor(message, color, title, description = '', fields, footer = 'Homework Help Bot', channelToSend = '', preembed = '') {
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
   * @description Sets the preembed value.
   * @param {string} preembed
   */
  setPreembed(preembed) {
    this.preembed = preembed;
  }

  /**
   * @description Sets the title value.
   * @param {string} title
   */
  setTitle(title) {
    this.content.embed.author.name = title;
  }

  /**
   * @description Sets the description value.
   * @param {string} description
   */
  setDescription(description) {
    this.content.embed.description = description;
  }

  /**
   * @description Sets the fields value.
   * @param {Array} fields
   */
  setFields(fields) {
    this.content.embed.fields = fields;
  }

  /**
   * @description Sets the footer value.
   * @param {string} footer
   */
  setFooter(footer) {
    this.content.embed.footer.text = footer;
  }

  /**
   * @description Method to send the embed to the current channel of instantiation.
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
   * @description Method to send the embed to a specified channel.
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
