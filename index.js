const Discord = require('discord.js');
const fs = require('fs');
const Raven = require('raven');
const { discordToken, sentryDSN } = require('./keys.json');

// Instantiations
const client = new Discord.Client();
client.events = new Discord.Collection();
Raven.config(sentryDSN).install();

require('./events')(client.events);

client.on('ready', () => {
  console.log('I\'m ready!');
});

client.on('message', (message) => {
  const {
    cleanContent: content,
    member,
    author,
    channel,
    mentions
  } = message;

  if (member) {
    const command = content.split().shift().toLowerCase(); // Get first word of string
    const operator = content.slice(0, 1);

    if (author.id === client.user.id) return; // Ignore own bot's messages

    if ((operator === '+' || operator === '-')
      && channel.id === '275071813992710144') { // Only in #change-role channel
      client.events
        .get('message::role')
        .execute(message);
    } else if (operator === '&'
      && channel.id === '425573787950514177') { // Only in #suggest-role channel
      client.events
        .get('message::suggestRole')
        .execute(message);
    } else if (command === '?gwarn'
      && mentions.members
      && member.roles.has('276969339901444096')) { // If they have @HWH Staff role
      client.events
        .get('message::warning')
        .execute(message);
    } else if (command === '?ta5') {
      client.events
        .get('message::tipa5')
        .execute(message);
    } else if (mentions.roles
      && channel.id !== '446051447226761216') { // Exclude #report channel
      client.events
        .get('message::report')
        .execute(message);
    } else if (command === '?hello'
      && author.id === '74576452854480896') { // Only if by @spencer
      client.events
        .get('message::tips')
        .execute(message);
    } else if (command === '?rules'
      && author.id === '74576452854480896') { // Only if by @spencer
      client.events
        .get('message::rules')
        .execute(message);
    } else if (channel.type === 'dm') {
      client.events
        .get('message::dm')
        .execute(message);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { message } = reaction;

  if (message.channel.id === '411828103321485313') {
    client.events
      .get('messageReactionAdd::suggestRole')
      .execute(reaction, user);
  }
});

client.on('guildMemberAdd', (member) => {
  client.events
    .get('guildMemberAdd::log')
    .execute(member);
});

client.on('guildMemberRemove', (member) => {
  client.events
    .get('guildMemberRemove::log')
    .execute(member);
});

client.on('guildBanAdd', (guild, user) => {
  client.events
    .get('guildBanAdd::log')
    .execute(guild, user);
});

client.on('guildBanRemove', (guild, user) => {
  client.events
    .get('guildBanRemove::log')
    .execute(guild, user);
});

client.login(discordToken);
