require('dotenv-extended').load();
import Discord, { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');

export default class Role {
	data: any 
    
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('role')
      .setDescription('role')
  }

  async execute(interaction) {
    const { client } = interaction;

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
              emoji: client.emojis.cache.get('910763444213542923'),
							label: 'Pre High School',
							description: 'Before high school',
							value: 'first_option',
						},
						{
              emoji: client.emojis.cache.get('910763444213542923'),
							label: 'High School',
							description: 'High school',
							value: 'high_school',
						},
					]),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
  }
}