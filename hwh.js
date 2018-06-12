const projectId = 'homework-help-7230a';

const Discord = require('discord.js');
const dialogflow = require('dialogflow');

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: './auth.json',
});
const client = new Discord.Client();

// HWH Server

client.on('guildMemberAdd', (member) => {
  if (member.guild.id === '238956364729155585') {
    member.guild.channels
      .get('302333358078427136')
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **joined** the server.`)
      .catch(err => console.error(err));
  }
});

client.on('guildMemberRemove', (member) => {
  if (member.guild.id === '238956364729155585') {
    member.guild.channels
      .get('302333358078427136')
      .send(`${member} (${member.user.username}#${member.user.discriminator}) has **left** the server.`)
      .catch(err => console.error(err));
  }
});

client.on('guildBanAdd', (guild, user) => {
  if (guild.id === '238956364729155585') {
    guild.channels
      .get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **banned**.`)
      .catch(err => console.error(err));
  }
});

client.on('guildBanRemove', (guild, user) => {
  if (guild.id === '238956364729155585') {
    guild.channels
      .get('302333358078427136')
      .send(`${user} (${user.username}#${user.discriminator}) was **unbanned**.`)
      .catch(err => console.error(err));
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
    * Dialogflow
    */

    // if (client.user.id !== author.id) {
    //   const sessionPath = sessionClient.sessionPath(projectId, author.id);

    //   const request = {
    //     session: sessionPath,
    //     queryInput: {
    //       text: {
    //         text: String(content),
    //         languageCode: 'en-US',
    //       },
    //     },
    //   };

    //   sessionClient.detectIntent(request)
    //     .then((responses) => {
    //       const result = responses[0].queryResult;
    //       if (result.intent.displayName === 'help' && content.length < 100) {
    //         message.reply(`${result.fulfillmentText}, ${result.intentDetectionConfidence}`);
    //       }
    //     })
    //     .catch(err => console.error(err));
    // }

    /*
    * Role Selection
    */

    if ((content.startsWith('+') || content.startsWith('-')) && channel.id === '275071813992710144') {
      const command = content.slice(0, 1).toLowerCase(); // get first part of string (command)
      let selectedRole = content.slice(1).trim().toLowerCase(); // get the rest of the string

      if (selectedRole.includes('-')) {
        selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
      }

      const validRole = guild.roles
        .map(({ id, name, color }) => {
          if (selectedRole === name.toLowerCase() && (
            color === 9807270
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
                    .reply(`you have added the **${name}** role!`)
                    .catch(err => console.error(err));
                }
              }
            } else if (command === '-' && selectedRole === name.toLowerCase()) {
              if (member) {
                if (member.roles.has(id)) {
                  guild.member(author.id)
                    .removeRole(id);
                  message
                    .reply(`you have removed the **${name}** role!`)
                    .catch(err => console.error(err));
                } else {
                  message
                    .reply(`error! You are not in the **${name}** role!`)
                    .catch(err => console.error(err));
                }
              }
            }
            return true;
          }
          return false;
        });

      if (!validRole.includes(true)) {
        message
          .reply('invalid role. See the pins for a comprehensive list.')
          .catch(err => console.error(err));
      }
    }

    /*
    * Suggest Role
    */

    if (content.startsWith('&') && channel.id === '425573787950514177') {
      const suggestion = content.slice(1); // get first part of string (command)

      const role = guild.roles
        .map(({ name }) => {
          if (suggestion.toLowerCase() === name.toLowerCase()) {
            member.guild.channels.get('425573787950514177')
              .send(`Role already exists.  You can add it in ${client.channels.get('275071813992710144').toString()}.`)
              .catch(err => console.error(err));
            return true;
          }
          return false;
        });

      if (!role.includes(true)) { // If the role exists
        message.reply(`suggested role ${suggestion} received.`);
        guild.channels.get('411828103321485313')
          .send(suggestion)
          .then((msg) => {
            msg.react('😁');
            msg.react('❌');
          })
          .catch(err => console.error(err));
      }

      message
        .delete()
        .catch(err => console.error(err));
    }

    /*
      * Warning
      */

    if (message.mentions.members && member.roles.has('276969339901444096') && (content.toLowerCase().startsWith('?gwarn'))) {
      let warn = [];
      let reason = [];

      const warned = mentions.members
        .map(m => m.id);

      if (warned !== undefined) {
        warn = content.split(' ');
        reason = warn.slice(2, warn.length); // Get the third->last array element

        channel
          .send(
            '',
            {
              embed: {
                color: 16645888,
                author: {
                  name: 'Warning',
                },
                description: `<@!${warned[0]}> was warned by a staff member.`,
                fields: [
                  {
                    name: 'Reason',
                    value: warn[2] === undefined ? 'No reason provided.' : reason.join(' '),
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'Homework Help',
                },
              },
            }
          )
          .catch(err => console.err(err));

        message
          .delete()
          .catch(err => console.error(err));
      }
    }

    /*
     * Tip 1
     */

    if (content.toLowerCase().startsWith('?ta5')) {
      let mention;

      if (mentions.members) {
        mention = mentions.members
          .map(m => m.id);
      }

      channel
        .send(
          `${mention[0] ? `<@${mention[0]}>` : ''}`,
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
          }
        )
        .catch(err => console.error(err));

      message
        .delete()
        .catch(err => console.error(err));
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
          .reply('thank you for your report. We will review it shortly.')
          .catch(err => console.error(err)); // Reply in channel with report

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
                  {
                    name: 'Jump to report',
                    value: `https://discordapp.com/channels/238956364729155585/${channel.id}?jump=${message.id}`,
                  },
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: 'Homework Help',
                },
              },
            }
          )
          .then((msg) => {
            msg.react('😁');
          })
          .catch(err => console.error(err));
        message
          .delete()
          .catch(err => console.error(err));
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
                  '• `@HWH Staff <@USER> <OFFENSE>` to submit a report.\n' +
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
                  value: 'The more people that join, the more knowledge that can be shared! Consequently, I encourage everybody to share the server with your friends!\n\nShare link: https://discord.gg/YudDZtb',
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help Bot',
              },
            },
          }
        )
        .catch(err => console.error(err));
      message
        .delete()
        .catch(err => console.error(err));
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
                  name: 'A. Quality of Life',
                  value: '**1) Respect others** — Keep in mind you are speaking to other people. Treat others how you want to be treated.\n' +
                    '**2) Remain civil**  — Maintain civil conversations by displaying a placid demeanor. Don\'t personally attack anyone over their physicality or personality. Avoid over-excessive profanity.\n' +
                    '**3) Don\'t send unsolicited direct messages** — As a courtesy to respect others\' privacy, don\'t send direct messages asking for help unless explicitly given permission.\n' +
                    '**4) Discord name / nickname**  — Your name must precede with a minimum of three alphanumeric characters, remain within the bounds of the message line, and maintain an appropriate appearance.\n' +
                    '**5) Use the `@HWH Staff` mention for reports only.** — In the report, please also include the offender and the offense.\n' +
                    '**6) Don\'t backseat moderate** — Let staff members give the punishments. If you notice a rule breaker, submit a report (reference the previous point (A.5)).\n\u200b',
                },
                {
                  name: 'B. Messaging',
                  value: '**1) Post clean content only**  — Keep the channels free of NSFW and illegal material.\n' +
                  '**2) Don\'t spam** — Don\'t send repeating, similar or non-pertinent messages in quick succession.\n' +
                  '**3) Don\'t advertise servers, services, or social media without permission** — We want to be sure to scan them for any inappropriate content before posting them.\n\u200b',
                },
                {
                  name: 'C. Help Channels',
                  value: '**1) Mentioning/Tagging Roles** — After posting your own question, wait a minimum of 15 minutes before using the helper mention. If nobody has replied by the 15 minutes, repost the question and include a helper mention with or after the question. Only use one ping per question (*exception*: if there is a matching sub-topic role, you may include the mentions in one message only, ex. `@Science @Physics`).\n' +
                  '**2) Be serious and encouraging in all help channels.** — We want to promote a sense of credibility when receiving help. Additionally, be encouraging to others, as they are merely trying to learn new things.\n' +
                  '**3) Don\'t cheat or encourage it** — Academic integrity is an ideology we uphold seriously, so do not attempt to encourage cheating. Instead, guide the person through the problem to gain intuition on how to solve it.\n' +
                  '**4) Don\'t offer payment, goods, or services in exchange for having your work done.** — We don\'t want to be held liable for any transactions that occur on this server.\n\u200b',
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'NOTE: Staff members have the power to take affirmative action in order to maintain a peaceful environment. They have the final say in any situation.',
              },
            },
          }
        )
        .catch(err => console.error(err));
      message
        .delete()
        .catch(err => console.error(err));
    }
  }

  if (channel.type === 'dm') {
    try {
      const messageInitiator = channel.recipient;
      const botOperator = '>';
      const serverChannel = client.channels.get('298286259028361218');

      if (content.startsWith(`${botOperator}challenge`) || content.startsWith(`${botOperator}c`)) {
        serverChannel
          .send(`*Challenge Entry* from **${messageInitiator}**: ${content}`)
          .catch(err => console.error(err));
        message
          .reply('Successfully sent!')
          .catch(err => console.error(err));
      } else if (content.startsWith(`${botOperator}help`) || content.startsWith(`${botOperator}h`)) {
        message
          .reply('I am a functional bot for the Homework Help Server!' +
          ' Here is a list of command(s):\n\n' +
          '**>c** <challenge ID> <link to your solution> - entering work for the challenge problem.\n' +
          '**?ta5** <@user> - macro saying "If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?""')
          .catch(err => console.error(err));
      }
    } catch (error) {
      console.error(error);
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  try {
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
          .delete()
          .catch(err => console.error(err));
        message.guild.channels
          .get('411828103321485313')
          .send(`Added ${content} role.`)
          .catch(err => console.error(err));
        message.guild.channels
          .get('425573787950514177')
          .send(`Suggested role ${content} was approved.`)
          .catch(err => console.error(err));
      } else if (emoji.name === '❌' && message.client.user.id !== user.id) {
        message
          .delete()
          .catch(err => console.error(err));
        message.guild.channels
          .get('411828103321485313')
          .send(`Rejected '${content}' role.`)
          .catch(err => console.error(err));
        message.guild.channels
          .get('425573787950514177')
          .send(`Suggested role ${content} was not approved.`)
          .catch(err => console.error(err));
      }
    }
  } catch (error) {
    console.error(error);
  }
});

client.login('***REMOVED***');
