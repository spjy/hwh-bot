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
const client = new DiscordClient({ 
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: [
    'CHANNEL'
  ]
});
const events: Discord.Collection<string, any> = new Discord.Collection();
const helpMentions: Discord.Collection<string, any> = new Discord.Collection();
Raven.config(process.env.SENTRY_DSN).install();

// Staff member role ID (@Staff)
const staffRoleId: string = process.env.STAFF_ROLE_ID;
// Staff member role ID (@Staff)
const staffReportRoleId: string = process.env.STAFF_REPORT_ROLE_ID;
// Mention Ban role ID
const mentionBanId: string = process.env.MENTION_BAN_ROLE_ID;

// Channel IDs
const mentionLogChannel: string = process.env.MENTION_LOG_CHANNEL_ID; // #mention-log
const botMessagesChannel: string = process.env.BOT_MESSAGES_CHANNEL_ID; // #bot-messages
const reportsChannel: string = process.env.REPORTS_CHANNEL_ID; // #reports

client.login(process.env.DISCORD_TOKEN);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands');

function instantiate(constructor, args) {
  var instance = Object.create(constructor.prototype);
  constructor.apply(instance, args);
  return instance;
}

aggregateEvents(events); // Require all events

client.on('ready', async () => {
  // eslint-disable-next-line
  console.log('I\'m ready!');
  
  const commands = await client.guilds.cache.get(process.env.GUILD_ID)?.commands.fetch();

  for (const file of commandFiles) {
    const name = file.endsWith('.ts') ? file.replace('.ts', '') : file.replace('.js', '');
    const command = require(`./commands/${name}`);
  
    const c = instantiate(command.default, null);
  
    if (c.permissions !== undefined) { 
      commands.find(({ name }) => name === c.command.name).permissions.add({ permissions: c.permissions });
    }
  
    client.commands.set(c.command.name, c);
  }
});

// Slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  
  try {
    // Mention command needs Discord collection
    if (interaction.commandName !== 'mention') {
      await command.execute(interaction);
    } else {
      await command.execute(interaction, helpMentions);
    }
  } catch (error) {
    console.error(error);
  }
});

// Buttons
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  if (!client.commands.has(action)) return;

  const command = client.commands.get(action);

  if (!command) return;

  try {
    // Mention command needs Discord collection
    if (action !== 'mention') {
      await command.executeButton(interaction, Number(id));
    } else {
      await command.executeButton(interaction, Number(id), helpMentions);
    }
  } catch (error) {
    console.error(error);
  }
});

// Select menu
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  if (!client.commands.has(action)) return;

  const command = client.commands.get(action);

  if (!command) return;

  try {
    // Mention command needs Discord collection
    if (action !== 'mention') {
      await command.executeMenu(interaction, Number(id));
    } else {
      await command.executeMenu(interaction, Number(id), helpMentions);
    }
  } catch (error) {
    console.error(error);
  }
});

// Context menu
client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenu()) return;

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  if (!client.commands.has(interaction.commandName)) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    // Mention command needs Discord collection
    if (interaction.commandName !== 'mention') {
      await command.executeContextMenu(interaction);
    } else {
      await command.executeContextMenu(interaction, helpMentions);
    }
  } catch (error) {
    console.error(error);
  }
});

// Messages
client.on('messageCreate', async (message) => {
  try {
    const {
      cleanContent: content,
      member,
      author,
      channel,
      mentions
    } = message;

    if (member) {
      const command = content.split(' ').shift().toLowerCase(); // Get first word of string
      const operator = content.slice(0, 1); // Get first letter of string

      if (author.id === client.user.id) return; // Ignore own bot's messages

      // events
      //   .get('message::dialogflow')
      //   .execute(message);

      // Reports are separate since stipulations are too general
      if (mentions.roles
        && channel.id !== reportsChannel) {
        const Report = events
          .get('message::report').default;

        new Report(message, reportsChannel, staffReportRoleId).execute();
      }

      // Commands
      if (command === '?gwarn'
        && mentions.members
        && member.roles.cache.has(staffRoleId)) {
        const Warning = events
          .get('message::warning').default;

        new Warning(message).execute();
      }
    }
  } catch (err) {
    Raven.captureException(err);
  }
});
