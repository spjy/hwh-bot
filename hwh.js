const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();

// HWH Server

client.on("guildMemberAdd", member => {
   if (member.guild.id === "238956364729155585") {
      member.guild.channels.get("302333358078427136").send(`${member} (${member.user.username}#${member.user.discriminator}) has **joined** the server.`);
   }
});

client.on("guildMemberRemove", member => {
   if (member.guild.id === "238956364729155585") {
      member.guild.channels.get("302333358078427136").send(`${member} (${member.user.username}#${member.user.discriminator}) has **left** the server.`);
   }
});

client.on("guildBanAdd", (guild, user) => {
   if (guild.id === "238956364729155585") {
      guild.channels.get("302333358078427136").send(`${user} (${user.username}#${user.discriminator}) was **banned**.`);
   }
});

client.on("guildBanRemove", (guild, user) => {
   if (guild.id === "238956364729155585") {
      guild.channels.get("302333358078427136").send(`${user} (${user.username}#${user.discriminator}) was **unbanned**.`);
   }
});

client.on('message', message => {

  const { content, channel, guild, member, author } = message;

  if (member) {

  /* 
   * Role Selection
   */

    if (content.startsWith("+") && channel.id === "275071813992710144" || content.startsWith("-") && channel.id === "275071813992710144") {
      const command = content.slice(0, 1).toLowerCase(); // get first part of string (command)
      let selectedRole = content.slice(1).trim().toLowerCase(); // get the rest of the string
      let roleValid = false;

      if (selectedRole.includes('-')) {
        selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
      }    

      guild.roles.map(({ id, name, color }) => {
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
                message.reply(`error! You are already in the **${name}** role!`);
              } else {
                guild.member(author.id).addRole(id);
                message.reply(`you have added the **${name}** role!`);
              }
            }
          } else if (command === '-' && selectedRole === name.toLowerCase()) {
            if (member) {
              if (member.roles.has(id)) {
                guild.member(author.id).removeRole(id);
                message.reply(`you have removed the **${name}** role!`);
              } else {
                message.reply(`error! You are not in the **${name}** role!`);
              }
            }
          }
          roleValid = true;
        }
      });

      if (!roleValid) {
        message.reply("you may only add these roles: `math`, `science`, `social studies`, `english`, `computer science`, `art`, `language`, `pre high school`, `high school`, `undergraduate`, `graduate`, `post graduate`, `independent`.");
      }
    }

    /* 
    * Suggest Role
    */

    if (content.startsWith("&") && channel.id === "425573787950514177") {
      const suggestion = content.slice(1); // get first part of string (command)
      let roleExists = false;

      guild.roles.map(({ id, name, color }) => {
        if (suggestion.toLowerCase() === name.toLowerCase()) {
          member.guild.channels.get("425573787950514177").send(`Role already exists.  You can add it in ${client.channels.get('275071813992710144').toString()}.`)
          roleExists = true;
        }
      });

      if (!roleExists) {
        message.reply('suggested role `' + suggestion + '` received.');
        member.guild.channels.get("411828103321485313").send(suggestion).then(msg => {
          msg.react("😁");
          msg.react("❌");
        }).catch((err) => console.log(err));
      }

      message.delete();
    }

      /* 
      * Warning
      */

      if (member.roles.has('267474828863340545') && content.toLowerCase().startsWith("?gwarn")
      || member.roles.has('410350754180890624') && content.toLowerCase().startsWith("?gwarn")) {
        
        let warn = [];
        let warned;
        let reason = [];

        warn = content.split(" ");

        if (message.mentions.members) {
          message.mentions.members.map((role) => {
            warned = role.id;
          });
        }

        if (warned !== undefined) {
          reason = warn.slice(2, warn.length); // Get the third->last array element

          channel.send('', { embed: {
            color: 16645888,
            author: {
              name: 'Warning',
            },
            description: '<@!' + warned + '>' + ' was warned by a staff member.',
            fields: [
              {
                name: 'Reason',
                value: warn[2] === undefined ? 'No reason provided.' : reason.join(' '),
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'Homework Help'
            }
          }});

          message.delete();
        }
      }

    /*
     * Tip 1
     */

    if (content.toLowerCase().startsWith("?t1")) {

      let mention;

      if (message.mentions.members) {
        message.mentions.members.map((role) => {
          mention = role.id;
        });
      }

      channel.send(`${mention ? mention : ''}`, { embed: {
        color: 1441536,
        author: {
          name: 'Tip',
        },
        description: 'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help'
        }
      }});
      message.delete();
    }

    /*
     * tinfo
     */

    if (message.content === '!tinfo' && message.author.id === '74576452854480896') {
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Welcome!',
        },
        description: 'Welcome to the Homework Help server. Collaborate on homework problems, try out the weekly challenge problem, or participate in the debates!',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      }});
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Server Rules',
        },
        description: '1. Respect others. \n\n' + 
        '2. Keep all conversations civil. \n\n' + 
        '3. Avoid over excessive profanity. \n\n' + 
        '4. Only post safe for work (SFW) and legal content. \n\n' +
        '5. Do not post repeating messages in quick succession (spam). \n\n' + 
        `6. Be serious in all help channels (${client.channels.get('238956921581862913').toString()} and below). \n\n` + 
        '7. Use the corresponding channels for your question. \n\n' + 
        '8. Don\'t advertise servers, services, or social media without permission. \n\n' + 
        '9. **After posting your own question, wait for a minimum of 15 minutes before using the helper mention. If nobody has replied by the 15 minutes, repost the question and include a helper mention with or after the question. Only use one ping per question.**\n\n' + 
        '10. Only ping HWH Staff in the case of an emergency or report. \n\n' + 
        '11. Unless explicitly given permission, do not direct message other members for help. \n\n' +
        '12. Don\'t backseat moderate: Let the staff give punishments. \n\n' +
        '13. Don\'t offer payment, goods, or services in exchange for having your work done.',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      }});
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Tips',
        },
        description: '\u2022 If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?". \n\u2022 Instead of merely giving answers, **guide the user through the problem**. \n\u2022 Use `=tex <LaTeX>` to post beautify your math problems! For example, `=tex x^2+2x-1`. \n\u2022 Staff members are in the <@&276969339901444096> role with green names.',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      }});
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Getting Started',
        },
        description: 'To get started, introduce yourself in '
        + client.channels.get('238956364729155585').toString() + ' '
        + client.channels.get('265996214426664960').toString() + '\nor post your problem / start a discussion in '
        + client.channels.get('238956921581862913').toString() + ' '
        + client.channels.get('238957079530831872').toString() + ' '
        + client.channels.get('267479462826868736').toString() + ' '
        + client.channels.get('238957870991802368').toString() + ' '
        + client.channels.get('265647050744397825').toString() + ' '
        + client.channels.get('266002466552807424').toString() + ' '
        + client.channels.get('266064797689184267').toString() + '\n\nYou may also join a role which denotes the subject you have expertise in and can help the most with. Join '
        + client.channels.get('275071813992710144').toString() + ' and see the channel\'s pins for more information. \n\nCheck out ' + client.channels.get('290260598111993856').toString() + ' to see previous challenge problems. \n\nParticipate in this week\'s, ' + client.channels.get('298273789123362816').toString() + ' or ' + client.channels.get('319945070537211906').toString() + '!'
        },
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      });
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Contributors',
        },
        description: 'Want to help out the server?  If you demonstrate, activity, maturity and knowledge, you may be recognized by the roles of <@&267486666292199435> or <@&319948173554745345>. \n\nHolding the <@&267486666292199435> role means that you\'ve demonstrated considerable understanding and knowledge in a certain topic and are active in the pertinent help channels. \n\nHolding the <@&319948173554745345> role means that you have contributed to a challenge, debate or creativity prompt.',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      }});
      message.channel.send("", {embed: {
        color: 15608105,
        author: {
          name: 'Share the server!',
        },
        description: 'The more people that join, the more knowledge that can be provided! Consequently, I encourage everybody to share the server with your friends! \n\n Share link: https://discord.gg/YudDZtb',
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: 'Homework Help Bot'
        }
      }});
      message.delete();
    }

    }

  if (message.channel.type === "dm") {
    const messageInitiator = message.channel.recipient;
    const botOperator = ">";
    const channel = client.channels.get('298286259028361218');

    if (message.content.startsWith(botOperator + "challenge") || message.content.startsWith(botOperator + "c")) {
      channel.send(`*Challenge Entry* from **${messageInitiator}**: ${message.content}`);
      message.reply("Successfully sent!");
    } else if (message.content.startsWith(botOperator + "report") || message.content.startsWith(botOperator + "r")) {
      channel.send(`*Report* from **${messageInitiator}"**: ${message.content}`);
      message.reply("Successfully sent!");
    } else if (message.content.startsWith(botOperator + "suggestion") || message.content.startsWith(botOperator + "s")) {
      channel.send(`*Suggestion* from **${messageInitiator}**: ${message.content}`);
      message.reply("Successfully sent!");
    } else if (message.content.startsWith(botOperator + "help")) {
      message.reply("I am a functional bot for the Homework Help Server!  Here is a list of commands:\n\n**>challenge** <link / image link to work> <answer> - entering work for the challenge problem.\n**>report** <user to report> <reason> - reporting a user.\n**>suggestion** <suggestion> <reasoning> - suggesting an improvement or addition to the server.\n\n**>c**, **>r**, and **>s** can all be used respectively in place of the longhanded versions.");
    }
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  const { message, emoji } = reaction;
  if (message.channel.id === '411828103321485313') {
    const { content } = message;
    if (emoji.name === '😁' && message.client.user.id !== user.id) {
      message.guild.createRole({
        name: content,
        color: 9807270,
        mentionable: true,
      });
      message.delete();
      message.guild.channels.get('411828103321485313').send(`Added ${content} role.`);
      message.guild.channels.get("425573787950514177").send(`Suggested role ${content} was approved.`);
    } else if (emoji.name === '❌' && message.client.user.id !== user.id) {
      message.delete();
      message.guild.channels.get('411828103321485313').send(`Rejected '${content}' role.`);
      message.guild.channels.get("425573787950514177").send(`Suggested role ${content} was not approved.`);
    }
  }
});

// client.on('message', message => {
// 	if (message.content === '!partners' && message.author.id === '74576452854480896') {
// 		message.channel.send("", {embed: {
// 			color: 8372802,
// 			author: {
// 				name: 'The Portal',
// 			},
// 			description: 'The Portal is one of the largest user-sourced catalog of invites to active Discord servers organized by category. Check it out when you have a chance, maybe you\'ll find something you like. Also, feel free to add servers that are not already listed. Server owners, admins and mods of listed servers can request roles commensurate with their rank on the listed server. \n \n**Server link**: https://discord.gg/6HtGJ98 ',
// 			timestamp: new Date(),
// 			footer: {
// 				icon_url: client.user.avatarURL,
// 				text: 'Homework Help Bot'
// 			}
// 		}});
// 		message.channel.send("", {embed: {
// 			color: 8372802,
// 			author: {
// 				name: 'MathBot',
// 			},
// 			description: 'This server\'s math equation rendering is powered by MathBot. For more information about the bot, check out its Discord server! \n \n **Server link**: http://discord.gg/pBfpVyf',
// 			timestamp: new Date(),
// 			footer: {
// 				icon_url: client.user.avatarURL,
// 				text: 'Homework Help Bot'
// 			}
// 		}});
// 	}
// });

// client.on ('message', message => {
//   if (message.content === '!info' && message.author.id === '74576452854480896') {
//   message.channel.send("", {embed: {
//     color: 	8372802,
//     author: {
//       name: 'Homework Help Server Information',
//     },
//     description: 'Need help with your homework in math, science, social studies, English, computer science, art, or language? Want to initiate a conversation on a topic you\'re passionate about? Feel free to join the Homework Help Discord Server!',
//     fields: [
//       {
//         name: "Rules",
//         value: '\u2022 Respect others and staff. \n\u2022 Keep all conversations civil. \n\u2022 Avoid over excessive profanity. \n\u2022 Only post safe for work (SFW) and legal content. \n\u2022 Do not post repeating messages in quick succession (spam). \n\u2022 Be serious in all help channels (#math and below). \n\u2022 Use the corresponding channels for your question. \n\u2022 Do not advertise other servers unless approved by staff.',
//       },
//       {
//         name: 'Punishments',
//         value: '\u2022 Warning is given to the user on first violation. \n\u2022 If behavior persists, user is kicked or banned under the discretion of the moderator.\n',
//       },
//       {
//         name: 'Tips',
//         value: '\u2022 If you have a question, **don\'t ask to ask the question, just ask it**. \n\u2022 Instead of merely giving answers, try to guide the user through the problem. \n\u2022 Use `=tex <LaTeX code>` to post beautify your math problems! For example, `=tex x^2+2x-1`. \n\u2022 Staff members are in the @HWH Staff role with green names.',
//       },
//       {
//         name: 'Getting Started',
//         value: 'To get started, introduce yourself in '
//         + client.channels.get('238956364729155585').toString() + ' '
//         + client.channels.get('265996214426664960').toString() + '\nor post your homework problem / start a discussion in '
//         + client.channels.get('238956921581862913').toString() + ' '
//         + client.channels.get('238957079530831872').toString() + ' '
//         + client.channels.get('267479462826868736').toString() + ' '
//         + client.channels.get('238957870991802368').toString() + ' '
//         + client.channels.get('265647050744397825').toString() + ' '
//         + client.channels.get('266002466552807424').toString() + ' '
//         + client.channels.get('266064797689184267').toString() + '\n\nYou may also join a role which denotes the subject you have expertise in and can help the most with. Join '
//         + client.channels.get('275071813992710144').toString() + ' and use the keywords "add" and the name corresponding to the subject channels (ex. add social-studies). \n\n Check out ' + client.channels.get('290260598111993856').toString() + ' to see previous challenge problems. \n\n Participate in this week\'s debate, ' + client.channels.get('298273789123362816').toString() + '! \n\n ',
//       },
//       {
//         name: 'Share the server!',
//         value: 'The more people that join, the more knowledge that can be provided! Consequently, *I encourage everybody to share the server* with your friends! \n\n Share link: https://discord.gg/YudDZtb',
//       },
//     ],
//     timestamp: new Date(),
//     footer: {
//       icon_url: client.user.avatarURL,
//       text: 'Homework Help Bot'
//     }
//   }});
//   }
// });

// client.on('message', message => {
//   if (message.content === '!welcome' && message.author.id === '74576452854480896') {
//   message.channel.send("", {embed: {
//     color: 1271946,
//     author: {
//       name: 'Hello, welcome to the Homework Help Server!',
//     },
//     description: 'Have questions on your homework in math, science, English, social studies, or general question?  Want to discuss and share ideas about a subject?  Come join us!',
//     timestamp: new Date(),
//     footer: {
//       icon_url: client.user.avatarURL,
//       text: 'Homework Help Bot'
//     }
//   }});
//   }
// });

client.login("***REMOVED***");
