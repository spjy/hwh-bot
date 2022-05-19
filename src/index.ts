require('dotenv-extended').load();
import Discord from 'discord.js';
import Raven from 'raven';
import fs from 'fs';
import logger from './logger';

import aggregateEvents from './events';

class DiscordClient extends Discord.Client {
  constructor(s: Discord.ClientOptions) {
    super(s);
  }

  commands: Discord.Collection<string, any>;
}

// Instantiations of Discord.js, Discord Collection, Sentry
const client = new DiscordClient({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['CHANNEL'],
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
  await logger.info("I'm ready!");

  for (const file of commandFiles) {
    const name = file.endsWith('.ts')
      ? file.replace('.ts', '')
      : file.replace('.js', '');
    const command = require(`./commands/${name}`);

    // Instantiate class
    const c = instantiate(command.default, null);

    // Save commands to an object with name of slash command
    client.commands.set(c.command.name, c);

    await logger.debug(`Loaded command "${name}"`, command);
  }
});

// Slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  await logger.trace('Retrieving slash command logic');

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  await logger.debug(`Executing slash command "${interaction.commandName}"`);

  try {
    // Mention command needs Discord collection
    if (interaction.commandName !== 'mention') {
      await command.execute(interaction);
    } else {
      await command.execute(interaction, helpMentions);
    }
  } catch (error) {
    await logger.error(error);
  }
});

// Buttons
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  await logger.trace('Retrieving button logic');

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  await logger.debug(`Executing button ${action}::${id}`);

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
    await logger.error(error);
  }
});

// Select menu
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  await logger.trace('Retrieving select menu logic');

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  const [action, id] = interaction.customId.split('::');

  await logger.debug(`Executing select menu ${action}::${id}`);

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
    await logger.error(error);
  }
});

// Context menu
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isContextMenu()) return;

  await logger.trace('Retrieving context menu logic');

  // format: interaction::[0-infty], e.g. report::0, report::1, report::2
  if (!client.commands.has(interaction.commandName)) return;

  const command = client.commands.get(interaction.commandName);

  await logger.debug(`Executing slash command "${interaction.commandName}"`);

  if (!command) return;

  try {
    // Mention command needs Discord collection
    if (interaction.commandName !== 'mention') {
      await command.executeContextMenu(interaction);
    } else {
      await command.executeContextMenu(interaction, helpMentions);
    }
  } catch (error) {
    await logger.error(error);
  }
});

// Modal
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  await logger.trace('Retrieving modal logic');

  const [action, id] = interaction.customId.split('::');

  if (!client.commands.has(action)) return;

  await logger.debug(`Executing select menu ${action}::${id}`);

  const command = client.commands.get(action);

  if (!command) return;

  try {
    // Mention command needs Discord collection
    await command.executeModalSubmit(interaction, Number(id));
  } catch (error) {
    await logger.error(error);
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
      mentions,
    } = message;

    await logger.trace('Message create event triggered');

    if (member) {
      const command = content.split(' ').shift().toLowerCase(); // Get first word of string
      const operator = content.slice(0, 1); // Get first letter of string

      if (author.id === client.user.id) return; // Ignore own bot's messages

      // events
      //   .get('message::dialogflow')
      //   .execute(message);

      // Reports are separate since stipulations are too general
      if (mentions.roles && channel.id !== reportsChannel) {
        const Report = events.get('message::report').default;

        new Report(message, reportsChannel, staffReportRoleId).execute();
      }

      // Commands
      if (
        command === '?gwarn' &&
        mentions.members &&
        member.roles.cache.has(staffRoleId)
      ) {
        const Warning = events.get('message::warning').default;

        new Warning(message).execute();
      }
    }
  } catch (error) {
    await logger.error(error);
    Raven.captureException(error);
  }
});
