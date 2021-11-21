require('dotenv-extended').load();
import Discord from 'discord.js';
import Raven from 'raven';
import fs from 'fs';

import aggregateEvents from './events';

class DiscordClient extends Discord.Client {
  constructor(s: Discord.ClientOptions) {
    super(s);
  }

  commands: Discord.Collection<string, any>
}

// Instantiations of Discord.js, Discord Collection, Sentry
const client = new DiscordClient({ intents: [Discord.Intents.FLAGS.GUILDS] });
const events: Discord.Collection<string, any> = new Discord.Collection();
const helpMentions: Discord.Collection<string, any> = new Discord.Collection();
Raven.config(process.env.SENTRY_DSN).install();

const guildId: string = process.env.GUILD_ID;
const clientId: string = process.env.APPLICATION_ID;

// Guild owner user ID (@spencer#6388)
const ownerUserId: string = '74576452854480900';
// Staff member role ID (@Staff)
const staffRoleId: string = '276969339901444096';
// Staff member role ID (@Staff)
const staffReportRoleId: string = '776950066198872065';
// Mention Ban role ID
const mentionBanId: string = '798287748259381359';

// Channel IDs
const changeRoleChannel: string = '275071813992710144'; // #change-role
const mentionLogChannel: string = '482699744305741834'; // #mention-log
const serverLogChannel: string = '302333358078427136'; // #server-log
const botMessagesChannel: string = '298286259028361218'; // #bot-messages
const reportsChannel: string = '446051447226761200'; // #reports

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

function instantiate(constructor, args) {
  var instance = Object.create(constructor.prototype);
  constructor.apply(instance, args);
  return instance;
}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  const c = instantiate(command.default, null);

  client.commands.set(c.data.name, c);
}

aggregateEvents(events); // Require all events

client.on('ready', () => {
  // eslint-disable-next-line
  console.log('I\'m ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  if (!client.commands.has(action)) return;

  const command = client.commands.get(action);

  if (!command) return;

  try {
    await command.executeButton(interaction, Number(id));
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  if (!client.commands.has(action)) return;

  const command = client.commands.get(action);

  if (!command) return;

  try {
    await command.executeMenu(interaction, Number(id));
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
