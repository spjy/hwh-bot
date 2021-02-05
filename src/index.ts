require('dotenv-extended').load();
import Discord from 'discord.js';
import Raven from 'raven';

import aggregateEvents from './events';

class DiscordClient extends Discord.Client {
}

// Instantiations of Discord.js, Discord Collection, Sentry
const client = new DiscordClient();
const events: Discord.Collection<string, any> = new Discord.Collection();
const helpMentions: Discord.Collection<string, any> = new Discord.Collection();
Raven.config(process.env.SENTRY_DSN).install();

// Guild owner user ID (@spencer#6388)
const ownerUserId: string = '74576452854480896';
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
const reportsChannel: string = '446051447226761216'; // #reports
const suggestRoleChannel: string = '425573787950514177'; // #suggest-role
const roleRequestChannel: string = '411828103321485313'; // #role-request

aggregateEvents(events); // Require all events

client.on('ready', () => {
  // eslint-disable-next-line
  console.log('I\'m ready!');
});

client.on('message', (message) => {
  try {
    const {
      cleanContent: content,
      member,
      author,
      channel,
      mentions
    } = message;

    if (channel.type === 'dm') {
      events
        .get('message::dm')
        .execute(message, client, botMessagesChannel);
    }

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
      if ((operator === '+' || operator === '-')
        && channel.id === changeRoleChannel) {
        const Role = events
          .get('message::role').default;

        new Role(message).execute();
      } else if (operator === '&'
        && channel.id === suggestRoleChannel) {
        events
          .get('message::suggestRole')
          .execute(
            message,
            suggestRoleChannel,
            changeRoleChannel,
            roleRequestChannel
          );
      } else if (command === '?gwarn'
        && mentions.members
        && member.roles.cache.has(staffRoleId)) {
        const Warning = events
          .get('message::warning').default;

        new Warning(message).execute();
      } else if (command === '?t1e' || command === '?ask') {
        const Tip1E = events
          .get('message::tip1e').default;

        new Tip1E(message).execute();
      } else if (command === '?tips'
        && author.id === ownerUserId) {
        const Tips = events
          .get('message::tips').default;

        new Tips(message).execute();
      } else if (command === '?rules'
        && author.id === ownerUserId) {
        const Rules = events
          .get('message::rules').default;

        new Rules(message).execute();
      } else if (command === '?mention') {
        const Mention = events
          .get('message::mention').default;

        new Mention(message, helpMentions, mentionLogChannel, mentionBanId).execute();
      }
    }
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildMemberAdd', (member) => {
  try {
    const { guild, user } = member;
    const GuildMemberAdd = events
      .get('guildMemberAdd::log').default;

    new GuildMemberAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildMemberRemove', (member) => {
  try {
    const { guild, user } = member;
    const GuildMemberRemove = events
      .get('guildMemberRemove::log').default;

    new GuildMemberRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildBanAdd', (guild, user) => {
  try {
    const GuildBanAdd = events
      .get('guildBanAdd::log').default;

    new GuildBanAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildBanRemove', (guild, user) => {
  try {
    const GuildBanRemove = events
      .get('guildBanRemove::log').default;

    new GuildBanRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
