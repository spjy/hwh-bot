require('dotenv-extended').load();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

const commands = [];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

function instantiate(constructor, args) {
  var instance = Object.create(constructor.prototype);
  constructor.apply(instance, args);
  return instance;
}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  const c = instantiate(command.default, null);

  commands.push(c.data.toJSON());
}

rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
