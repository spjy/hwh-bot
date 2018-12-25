const Raven = require('raven');

/**
* Send an embed to a specified channel.
* @param {Object} message - The message being sent.
* @param {Number} color - The color of the side of the embed.
* @param {string} title - The title of the embed (at the very top).
* @param {string} description - The description of the embed (after the title).
* @param {Array} fields - The fields of the embed.
* @param {string} footer - The message at the footer of the embed.
* @param {string} [preembed = ''] - A message before the embed.
* @param {string} channelToSend - The channel to send the embed.
*/

export default class Embed {
  constructor(message, color, title, description, fields, footer, preembed = '', channelToSend) {
    const {
      channel,
      guild
    } = message;

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
    this.preembed = preembed;
    this.channelToSend = channelToSend;
  }

  async sendToCurrentChannel() {
    try {
      await this.channel
        .send(
          this.preembed,
          this.content
        );
    } catch (err) {
      Raven.captureException(err);
    }
  }

  async sendToDifferentChannel() {
    try {
      await this.guild.channels
        .get(this.channelToSend)
        .send(
          this.preembed,
          this.content
        );
    } catch (err) {
      Raven.captureException(err);
    }
  }
}
