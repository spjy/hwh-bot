require('dotenv-extended').load();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commandFiles = fs.readdirSync('./src/commands');

const commands = [];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

function instantiate(constructor, args) {
  var instance = Object.create(constructor.prototype);
  constructor.apply(instance, args);
  return instance;
}

export default function deploy() {
  for (const file of commandFiles) {
    const name = file.endsWith('.ts')
      ? file.replace('.ts', '')
      : file.replace('.js', '');
    const command = require(`./commands/${name}`);

    const c = instantiate(command.default, null);

    if (c.command) {
      commands.push(c.command.toJSON());
    }

    if (c.context) {
      commands.push(c.context.toJSON());
    }
  }

  rest
    .put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    )
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}

deploy();
