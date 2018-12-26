"use strict";

require("core-js/modules/es6.regexp.split");

require('dotenv-extended').load();

var Discord = require('discord.js');

var Raven = require('raven'); // Instantiations of Discord.js, Discord Collection, Sentry


var client = new Discord.Client();
client.events = new Discord.Collection();
var helpMentions = new Discord.Collection();
Raven.config(process.env.SENTRY_DSN).install(); // Guild owner user ID (@spencer#6388)

var ownerUserId = '74576452854480896'; // Staff member role ID (@Staff)

var staffRoleId = '276969339901444096'; // Channel IDs

var changeRoleChannel = '275071813992710144'; // #change-role

var mentionLogChannel = '482699744305741834'; // #mention-log

var serverLogChannel = '302333358078427136'; // #server-log

var botMessagesChannel = '298286259028361218'; // #bot-messages

var reportsChannel = '446051447226761216'; // #reports

var suggestRoleChannel = '425573787950514177'; // #suggest-role

var roleRequestChannel = '411828103321485313'; // #role-request

require('./events')(client.events); // Require all events


client.on('ready', function () {
  // eslint-disable-next-line
  console.log('I\'m ready!');
});
client.on('message', function (message) {
  try {
    var content = message.cleanContent,
        member = message.member,
        author = message.author,
        channel = message.channel,
        mentions = message.mentions;

    if (channel.type === 'dm') {
      client.events.get('message::dm').execute(message, client, botMessagesChannel);
    }

    if (member) {
      var command = content.split(' ').shift().toLowerCase(); // Get first word of string

      var operator = content.slice(0, 1); // Get first letter of string

      if (author.id === client.user.id) return; // Ignore own bot's messages
      // client.events
      //   .get('message::dialogflow')
      //   .execute(message);
      // Reports are separate since stipulations are too general

      if (mentions.roles && channel.id !== reportsChannel) {
        client.events.get('message::report').execute(message, reportsChannel, staffRoleId);
      } // Commands


      if ((operator === '+' || operator === '-') && channel.id === changeRoleChannel) {
        client.events.get('message::role').execute(message);
      } else if (operator === '&' && channel.id === suggestRoleChannel) {
        client.events.get('message::suggestRole').execute(message, suggestRoleChannel, changeRoleChannel, roleRequestChannel);
      } else if (command === '?gwarn' && mentions.members && member.roles.has(staffRoleId)) {
        var Warning = client.events.get('message::warning').default;
        new Warning(message).execute();
      } else if (command === '?ta5') {
        var TipA5 = client.events.get('message::tipa5').default;
        new TipA5(message).execute();
      } else if (command === '?tips' && author.id === ownerUserId) {
        var Tips = client.events.get('message::tips').default;
        new Tips(message).execute();
      } else if (command === '?rules' && author.id === ownerUserId) {
        var Rules = client.events.get('message::rules').default;
        new Rules(message).execute();
      } else if (command === '!mentionable' && member.roles.has(staffRoleId)) {
        client.events.get('message::mentionable').execute(message);
      } else if (command === '?mention') {
        client.events.get('message::mention').execute(message, helpMentions, mentionLogChannel);
      }
    }
  } catch (err) {
    Raven.captureException(err);
  }
});
client.on('messageReactionAdd', function (reaction, user) {
  try {
    var message = reaction.message;

    if (message.channel.id === roleRequestChannel) {
      client.events.get('messageReactionAdd::suggestRole').execute(reaction, user, suggestRoleChannel, roleRequestChannel);
    }
  } catch (err) {
    Raven.captureException(err);
  }
});
client.on('guildMemberAdd', function (member) {
  try {
    var guild = member.guild,
        user = member.user;
    var GuildMemberAdd = client.events.get('guildMemberAdd::log').default;
    new GuildMemberAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});
client.on('guildMemberRemove', function (member) {
  try {
    var guild = member.guild,
        user = member.user;
    var GuildMemberRemove = client.events.get('guildMemberRemove::log').default;
    new GuildMemberRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});
client.on('guildBanAdd', function (guild, user) {
  try {
    var GuildBanAdd = client.events.get('guildBanAdd::log').default;
    new GuildBanAdd(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});
client.on('guildBanRemove', function (guild, user) {
  try {
    var GuildBanRemove = client.events.get('guildBanRemove::log').default;
    new GuildBanRemove(guild, user, serverLogChannel).execute();
  } catch (err) {
    Raven.captureException(err);
  }
});
client.login(process.env.DISCORD_TOKEN);