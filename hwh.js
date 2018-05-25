const Discord = require('discord.js');

const client = new Discord.Client();

// HWH Server

client.on('guildMemberAdd', (member) => {
  if (member.guild.id === '238956364729155585') {
    member.guild.channels.get('302333358078427136')
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **joined** the server.`);
  }
});

client.on('guildMemberRemove', (member) => {
  if (member.guild.id === '238956364729155585') {
    member.guild.channels.get('302333358078427136')
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **left** the server.`);
  }
});

client.on('guildBanAdd', (guild, user) => {
  if (guild.id === '238956364729155585') {
    guild.channels.get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **banned**.`);
  }
});

client.on('guildBanRemove', (guild, user) => {
  if (guild.id === '238956364729155585') {
    guild.channels.get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **unbanned**.`);
  }
});

client.on('message', (message) => {
  const {
    content,
    channel,
    guild,
    member,
    author,
    mentions,
  } = message;

  if (member) {
  /*
   * Role Selection
   */

    if (content.startsWith('+') && (channel.id === '275071813992710144' || channel.id === '275071813992710144')) {
      const command = content.slice(0, 1).toLowerCase(); // get first part of string (command)
      let selectedRole = content.slice(1).trim().toLowerCase(); // get the rest of the string
      let roleValid = false;

      if (selectedRole.includes('-')) {
        selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
      }

      guild.roles
        .map(({ id, name, color }) => {
          if (selectedRole === name.toLowerCase() && (color === 9807270
            || color === 16770276
            || color === 16760511
            || color === 16741498
            || color === 12713987
            || color === 9240581
            || color === 12596388)) {
            if (command === '+' && selectedRole === name.toLowerCase()) {
              if (member) {
                if (member.roles.has(id)) {
                  message
                    .reply(`error! You are already in the **${name}** role!`);
                } else {
                  guild.member(author.id)
                    .addRole(id);
                  message
                    .reply(`you have added the **${name}** role!`);
                }
              }
            } else if (command === '-' && selectedRole === name.toLowerCase()) {
              if (member) {
                if (member.roles.has(id)) {
                  guild.member(author.id)
                    .removeRole(id);
                  message
                    .reply(`you have removed the **${name}** role!`);
                } else {
                  message
                    .reply(`error! You are not in the **${name}** role!`);
                }
              }
            }
            roleValid = true;
          }
        });

      if (!roleValid) {
        message
          .reply('you may only add these roles: `math`, `science`, `social studies`, `english`, `computer science`, `art`, `language`, `pre high school`, `high school`, `undergraduate`, `graduate`, `post graduate`, `independent`.');
      }
    }

    /*
    * Suggest Role
    */

    if (content.startsWith('&') && channel.id === '425573787950514177') {
      const suggestion = content.slice(1); // get first part of string (command)
      let roleExists = false;

      guild.roles
        .map(({ name }) => {
          if (suggestion.toLowerCase() === name.toLowerCase()) {
            member.guild.channels.get('425573787950514177')
              .send(`Role already exists.  You can add it in ${client.channels.get('275071813992710144').toString()}.`);
            roleExists = true;
          }
        });

      if (!roleExists) {
        message.reply(`suggested role ${suggestion} received.`);
        guild.channels.get('411828103321485313')
          .send(suggestion)
          .then((msg) => {
            msg.react('😁');
            msg.react('❌');
          });
      }

      message.delete();
    }

    /*
      * Warning
      */

    if (message.mentions.members && (member.roles.has('267474828863340545') && (content.toLowerCase().startsWith('?gwarn')
      || content.toLowerCase().startsWith('?gwarn')))) {
      let warn = [];
      let reason = [];

      warn = content.split(' ');

      const warned = mentions.members
        .map(m => m.id);

      if (warned !== undefined) {
        reason = warn.slice(2, warn.length); // Get the third->last array element

        channel.send(
          '',
          {
            embed: {
              color: 16645888,
              author: {
                name: 'Warning',
              },
              description: `<@!${warned}> was warned by a staff member.`,
              fields: [
                {
                  name: 'Reason',
                  value: warn[2] === undefined ? 'No reason provided.' : reason.join(' '),
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help',
              },
            },
          },
        );

        message
          .delete();
      }
    }

    /*
     * Tip 1
     */

    if (content.toLowerCase().startsWith('?ta5')) {

      let mention;

      if (mentions.members) {
        mentions.members
          .map((m) => {
            mention = m.id;
          });
      }

      channel.send(
        `${mention ? mention : ''}`,
        {
          embed: {
            color: 1441536,
            author: {
              name: 'Tip',
            },
            description: 'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Homework Help',
            },
          },
        },
      );

      message
        .delete();
    }

    /*
     * Report @HWH Staff
     */

    if (mentions.roles && channel.id !== '446051447226761216' && author.id !== '274437921183105034') { 
      // If channel is not in #reports and author is not @HWH

      const report = message.mentions.roles // Extract roles in message
        .map(role => role.id);

      if (report.includes('276969339901444096')) { // If mentions include @HWH Staff
        message
          .reply('thank you for your report. We will review it shortly.'); // Reply in channel with report

        message.guild.channels
          .get('446051447226761216') // Send information to report channel
          .send(
            '',
            {
              embed: {
                color: 16645888,
                author: {
                  name: 'Report',
                },
                description: '',
                fields: [
                  {
                    name: 'Reporter',
                    value: `${author}`,
                    inline: true,
                  },
                  {
                    name: 'Channel',
                    value: `${channel}`,
                    inline: true,
                  },
                  {
                    name: 'Message',
                    value: `${content}`,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'Homework Help',
                },
              },
            },
          );
        message
          .delete();
      }
    }

    /*
     * ?hello channel
     */

    if (content === '?hello' && message.author.id === '74576452854480896') {
      channel
        .send(
          '',
          {
            embed: {
              color: 15608105,
              author: {
                name: 'Tips',
              },
              description: 'Welcome to the Homework Help Discord Server!',
              fields: [
                {
                  name: 'A. Getting Started',
                  value: '**1) Familiarize yourself with the rules** so you don\'t get in trouble.\n' +
                    '**2) Introduce yourself** Say hello in <#238956364729155585> and talk a little about yourself!\n' +
                    '**3) Get a shiny new role** to display what you can help the most with in <#275071813992710144>.\n' +
                    '**4) Start a discussion or ask for help** in the respective channels.\n' +
                    '**5) If you have a question, don\'t hesitate to ask it.** To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\n' +
                    '**6) Display your knowledge** in one of our events <#446166388235829248>.\n\u200b',
                },
                {
                  name: 'B. HWH Bot',
                  value: '**1) Server Commands** —\n' +
                  '• `@HWH Staff <@USER> <OFFENSE>` to anonymously submit a report.\n' +
                  '• `?ta5` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n' +
                  '**2) Direct Message Commands** —\n' +
                  '• `>c <challenge id> <work>` for event submissions.\n\u200b',
                },
                {
                  name: 'C. MathBot',
                  value: '**1) LaTeX Renderer** — You can beautify your math by converting LaTeX into beautiful images. Use `=tex your LaTeX code here`.\n' +
                  '**2) Wolfram Alpha Queryer** — Use MathBot to query Wolfram Alpha for mathematical computations or other knowledge. Use `=wolf wolfram alpha query`. Only usable in #spam-channel.\n\u200b',
                },
                {
                  name: 'D. Contributing',
                  value: '**1) Valued Contributor** — If you display considerable knowledge, activity and maturity in the help channels, you will be recognized as a valued contributor.\n' +
                  '**2) Event Contributor** — If you have contributed a prompt to one of the Homework Help Events, you will receive this role.\n\u200b',
                },
                {
                  name: 'E. Staff Positions',
                  value: '**1) Moderators** keep the peace of the server and complete various tasks that need to be done around the server.\n' +
                  '**2) Guides** also keep the peace of the server. They welcome people, answer people\'s questions and warn people of rule offenses.\n' +
                  '**3) Event Managers** organize events and create prompts for them.\n' +
                  '**Applying for staff** — If you want to apply for Guide or Event Manager, apply here: <https://goo.gl/forms/Z3mVQwLdiNZcKHx52>\n\u200b',
                },
                {
                  name: 'F. Sharing the server',
                  value: 'The more people that join, the more knowledge that can be shared! Consequently, I encourage everybody to share the server with your friends!\n\nShare link: https://discord.gg/YudDZtb'
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help Bot',
              },
            },
          },
        );
      message
        .delete();
    }

    /*
     * ?rules channel
     */

    if (content === '?rules' && message.author.id === '74576452854480896') {
      channel
        .send(
          '',
          {
            embed: {
              color: 15608105,
              author: {
                name: 'Rules',
              },
              description: 'In addition to following the [Discord Guidelines](http://dis.gd/guidelines), you must also comply with these rules while on Homework Help:',
              fields: [
                {
                  name: 'Quality of Life',
                  value: '**1) Familiarize yourself with the rules** so you don\'t get in trouble.\n' +
                    '**2) Introduce yourself** Say hello in <#238956364729155585> and talk a little about yourself!\n' +
                    '**3) Get a shiny new role** to display what you can help the most with in <#275071813992710144>.\n' +
                    '**4) Start a discussion or ask for help** in the respective channels.\n' +
                    '**5) If you have a question, don\'t hesitate to ask it.** To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\n' +
                    '**6) Display your knowledge** in one of our events <#446166388235829248>.\n\u200b',
                },
                {
                  name: 'Help Channels',
                  value: '**1) Server Commands** —\n' +
                  '• `@HWH Staff <@USER> <OFFENSE>` to anonymously submit a report.\n' +
                  '• `?ta5` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n' +
                  '**2) Direct Message Commands** —\n' +
                  '• `>c <challenge id> <work>` for event submissions.\n\u200b',
                },
                {
                  name: 'C. MathBot',
                  value: '**1) LaTeX Renderer** — You can beautify your math by converting LaTeX into beautiful images. Use `=tex your LaTeX code here`.\n' +
                  '**2) Wolfram Alpha Queryer** — Use MathBot to query Wolfram Alpha for mathematical computations or other knowledge. Use `=wolf wolfram alpha query`. Only usable in #spam-channel.\n\u200b',
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help Bot',
              },
            },
          },
        );
      message
        .delete();
    }
  }

  if (channel.type === 'dm') {
    const messageInitiator = channel.recipient;
    const botOperator = '>';
    const channel = client.channels.get('298286259028361218');

    if (content.startsWith(`${botOperator}challenge`) || content.startsWith(`${botOperator}c`)) {
      channel
        .send(`*Challenge Entry* from **${messageInitiator}**: ${content}`);
      message
        .reply('Successfully sent!');
    } else {
      message
        .reply('I am a functional bot for the Homework Help Server!' +
        'Here is a list of command(s):\n\n' +
        '**>c** <link / image link to work> <answer> - entering work for the challenge problem.\n');
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { message, emoji } = reaction;
  if (message.channel.id === '411828103321485313') {
    const { content } = message;
    if (emoji.name === '😁' && message.client.user.id !== user.id) {
      message.guild
        .createRole({
          name: content,
          color: 9807270,
          mentionable: true,
        });
      message
        .delete();
      message.guild.channels
        .get('411828103321485313')
        .send(`Added ${content} role.`);
      message.guild.channels
        .get('425573787950514177')
        .send(`Suggested role ${content} was approved.`);
    } else if (emoji.name === '❌' && message.client.user.id !== user.id) {
      message
        .delete();
      message.guild.channels
        .get('411828103321485313')
        .send(`Rejected '${content}' role.`);
      message.guild.channels
        .get('425573787950514177')
        .send(`Suggested role ${content} was not approved.`);
    }
  }
});

client.login('***REMOVED***');
