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
    const { client, guild } = interaction;

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('role')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
              emoji: '1️⃣',
							label: 'Pre High School',
							description: 'Before high school',
							value: 'first_option',
						},
						{
              emoji: '2️⃣',
							label: 'High School',
							description: 'High school',
							value: 'high_school',
						},
					]),
			);

    const r = await (<Discord.TextChannel>guild.channels
      .cache
      .get(process.env.CHANGE_ROLE_CHANNEL_ID))
      .send({
        content: 'k',
        components: [row]
      });

		await interaction.reply({ content: 'hath been senterino' });
  }

  async executeMenu(interaction: Discord.MessageComponentInteraction, id: Number) {
    console.log(interaction.values);
  }
}