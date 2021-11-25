import Discord from 'discord.js';

/**
 * Sends Tip1E in an embed to the current channel. Triggered by `?t1e`.
 */
export default class Tip1E {
  message: Discord.Message
  /**
   * @param {Object} message - The message object instantiating `?t1e`.
   */
  constructor(message) {
    this.message = message;
  }
    
    /**
     * The main function to run.
     */
    execute() {
      const {
        client,
        mentions,
        channel
      } = this.message;
      
      let mention;
      
      // Get mentions in message
      mention = mentions.members
        .map(m => m.id);

      const tip = new Discord.MessageEmbed({
        color: 1441536,
        title: 'Tip',
        description: 'If you have a question, don\'t hesitate to ask it. To save time, '
        + 'post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL(),
          text: 'Homework Help Bot' 
        }
      })

      channel.send({
        content: mention.length > 0 ? `<@!${mention[0]}>` : null,
        embeds: [tip]
      })
  }
}
