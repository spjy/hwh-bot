require('dotenv-extended').load();
import { REST, Routes } from 'discord.js';
import fs from 'fs';

const commandFiles = fs.readdirSync('./src/commands');

const commands: object[] = [];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

export function instantiate(constructor: any, args: any) {
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
