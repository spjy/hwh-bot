require('dotenv-extended').load();
import Discord from 'discord.js';
import Raven from 'raven';

// Instantiations of Discord.js, Discord Collection, Sentry
const client = new Discord.Client();
client.events = new Discord.Collection();
const helpMentions = new Discord.Collection();
Raven.config(process.env.SENTRY_DSN).install();

// Guild owner user ID (@spencer#6388)
const ownerUserId = '74576452854480896';
// Staff member role ID (@Staff)
const staffRoleId = '276969339901444096';
// Study Group Mentor role ID (@Study Group Mentor)
const studyGroupMentorId = '588998000395812874';

// Channel IDs
const changeRoleChannel = '275071813992710144'; // #change-role
const mentionLogChannel = '482699744305741834'; // #mention-log
const serverLogChannel = '302333358078427136'; // #server-log
const botMessagesChannel = '298286259028361218'; // #bot-messages
const reportsChannel = '446051447226761216'; // #reports
const suggestRoleChannel = '425573787950514177'; // #suggest-role
const roleRequestChannel = '411828103321485313'; // #role-request

require('./events')(client.events); // Require all events

client.on('ready', () => {
  // eslint-disable-next-line
  console.log('I\'m ready!');
});

// const events = {
//   MESSAGE_DELETE: 'messageDelete'
// };

// client.on('raw', async event => {
//   const { t, d } = event;

//   if (t !== 'MESSAGE_DELETE') return;

//   const GuildBanAdd = client.events
//     .get('messageDelete::log').default;

//   new GuildBanAdd(guild, user, serverLogChannel).execute();
// });

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
      client.events
        .get('message::dm')
        .execute(message, client, botMessagesChannel);
    }

    if (member) {
      const command = content.split(' ').shift().toLowerCase(); // Get first word of string
      const operator = content.slice(0, 1); // Get first letter of string

      if (author.id === client.user.id) return; // Ignore own bot's messages

      // client.events
      //   .get('message::dialogflow')
      //   .execute(message);

      // Reports are separate since stipulations are too general
      if (mentions.roles
        && channel.id !== reportsChannel) {
        const Report = client.events
          .get('message::report').default;

        new Report(message, reportsChannel, staffRoleId).execute();
      }

      // Commands
      if ((operator === '+' || operator === '-')
        && channel.id === changeRoleChannel) {
        const Role = client.events
          .get('message::role').default;

        new Role(message).execute();
      } else if (operator === '&'
        && channel.id === suggestRoleChannel) {
        client.events
          .get('message::suggestRole')
          .execute(
            message,
            suggestRoleChannel,
            changeRoleChannel,
            roleRequestChannel
          );
      } else if (command === '?gwarn'
        && mentions.members
        && member.roles.has(staffRoleId)) {
        const Warning = client.events
          .get('message::warning').default;

        new Warning(message).execute();
      } else if (command === '?t1e') {
        const Tip1E = client.events
          .get('message::tip1e').default;

        new Tip1E(message).execute();
      } else if (command === '?tips'
        && author.id === ownerUserId) {
        const Tips = client.events
          .get('message::tips').default;

        new Tips(message).execute();
      } else if (command === '?rules'
        && author.id === ownerUserId) {
        const Rules = client.events
          .get('message::rules').default;

        new Rules(message).execute();
      } else if (command === '!mentionable'
        && member.roles.has(staffRoleId)) {
        client.events
          .get('message::mentionable')
          .execute(message);
      } else if (command === '?mention') {
        const Mention = client.events
          .get('message::mention').default;

        new Mention(message, helpMentions, mentionLogChannel).execute();
      } else if (command === '?sg'
        && (member.roles.has(studyGroupMentorId)
        || member.roles.has(staffRoleId))) {
        const PingSg = client.events
          .get('message::pingSg').default;

        new PingSg(message).execute();
      }
    }
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  try {
    const { message } = reaction;

    if (message.channel.id === roleRequestChannel) {
      client.events
        .get('messageReactionAdd::suggestRole')
        .execute(
          reaction,
          user,
          suggestRoleChannel,
          roleRequestChannel
        );
    }
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildMemberAdd', (member) => {
  try {
    const { guild, user } = member;
    const GuildMemberAdd = client.events
      .get('guildMemberAdd::log').default;

    new GuildMemberAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildMemberRemove', (member) => {
  try {
    const { guild, user } = member;
    const GuildMemberRemove = client.events
      .get('guildMemberRemove::log').default;

    new GuildMemberRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildBanAdd', (guild, user) => {
  try {
    const GuildBanAdd = client.events
      .get('guildBanAdd::log').default;

    new GuildBanAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.on('guildBanRemove', (guild, user) => {
  try {
    const GuildBanRemove = client.events
      .get('guildBanRemove::log').default;

    new GuildBanRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
