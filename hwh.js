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
  if (message.content.includes("+") && message.channel.id === "275071813992710144" || message.content.includes("-") && message.channel.id === "275071813992710144") {
    const command = message.content.slice(0, 1).toLowerCase(); // get first part of string (command)
    let selectedRole = message.content.slice(1).trim().toLowerCase(); // get the rest of the string
    let roleValid = false;

    if (selectedRole.includes('-')) {
      selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
    }    

    message.guild.roles.map(({ id, name, color }) => {
      if (selectedRole === name.toLowerCase() && color === 9807270
        || selectedRole === name.toLowerCase() && color === 16770276
        || selectedRole === name.toLowerCase() && color === 16760511
        || selectedRole === name.toLowerCase() && color === 16741498
        || selectedRole === name.toLowerCase() && color === 12713987
        || selectedRole === name.toLowerCase() && color === 9240581
        || selectedRole === name.toLowerCase() && color === 12596388) {
        if (command === '+' && selectedRole === name.toLowerCase()) {
          if (message.member.roles.has(id)) {
            message.reply(`error! You are already in the **${name}** role!`);
          } else {
            message.guild.member(message.author.id).addRole(id);
            message.reply(`you have added the **${name}** role!`);
          }
        } else if (command === '-' && selectedRole === name.toLowerCase()) {
          if (message.member.roles.has(id)) {
            message.guild.member(message.author.id).removeRole(id);
            message.reply(`you have removed the **${name}"** role!`);
          } else {
            message.reply(`error! You are not in the **${name}** role!`);
          }
        }
        roleValid = true;
      }
    });

    if (!roleValid) {
      message.reply("you may only add these roles: `math`, `science`, `social studies`, `english`, `computer science`, `art`, `language`, `high school`, `undergraduate`, `graduate`, `post graduate`, `independent`.");
    }
  }
});

client.on('message', message => {
  if (message.content.startsWith("&") && message.channel.id === "275071813992710144") {
    const command = message.content.slice(1); // get first part of string (command)
    
    //275071813992710144
    message.member.guild.channels.get("411828103321485313").send(command).then(msg => {
      msg.react("😁");
      msg.react("❌");
    });
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.channel.id === '411828103321485313') {
    if (reaction.emoji.name === '😁' && reaction.message.client.user.id !== user.id) {
      reaction.message.guild.createRole({
        name: reaction.message.content,
        color: 9807270
      });
      reaction.message.delete();
      reaction.message.guild.channels.get('411828103321485313').send(`Added '${reaction.message.content}' role.`)
    } else if (reaction.emoji.name === '❌' && reaction.message.client.user.id !== user.id) {
      reaction.message.delete();
      reaction.message.guild.channels.get('411828103321485313').send(`Rejected '${reaction.message.content}' role.`)
    }
  }
});

// client.on('message', message => {

//   if (message.guild.id === "238956364729155585") {
//     if (message.member.roles.has('276969339901444096') && message.content.toLowerCase().startsWith("!warn")) {
//       let warn = [];
//       let warned;
//       let reason = [];

//       warn = message.content.split(" ");

//       message.mentions.members.map((role) => {
//         warned = role.id;
//       });

//       if (warned !== undefined) {
//         reason = warn.slice(2, warn.length);

//         message.channel.send('<@!' + warned + '>', { embed: {
//           color: 16645888,
//           author: {
//             name: 'Warning',
//           },
//           description: 'You were warned by a staff member.',
//           fields: [
//             {
//               name: 'Reason',
//               value: warn[2] === undefined ? 'No reason provided.' : reason.join(' '),
//             }
//           ],
//           timestamp: new Date(),
//           footer: {
//             icon_url: client.user.avatarURL,
//             text: 'Homework Help'
//           }
//         }});

//         client.channels.get('284858331745615872').send("", { embed: {
//           color: 16645888,
//           author: {
//             name: 'Warning',
//           },
//           description: '<@!' + warned + '> was warned by <@!' + message.author.id + '>.',
//           fields: [
//             {
//               name: 'Reason',
//               value: warn[2] === undefined ? 'No reason provided.' : reason.join(' '),
//             }
//           ],
//           timestamp: new Date(),
//           footer: {
//             icon_url: client.user.avatarURL,
//             text: 'Homework Help'
//           }
//         }});

//         message.delete();
//       }
//     }
//   }
// });

client.on('message', message => {
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

client.on('message', message => {
	if (message.content === '!partners' && message.author.id === '74576452854480896') {
		message.channel.send("", {embed: {
			color: 8372802,
			author: {
				name: 'The Portal',
			},
			description: 'The Portal is one of the largest user-sourced catalog of invites to active Discord servers organized by category. Check it out when you have a chance, maybe you\'ll find something you like. Also, feel free to add servers that are not already listed. Server owners, admins and mods of listed servers can request roles commensurate with their rank on the listed server. \n \n**Server link**: https://discord.gg/6HtGJ98 ',
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: 'Homework Help Bot'
			}
		}});
		message.channel.send("", {embed: {
			color: 8372802,
			author: {
				name: 'MathBot',
			},
			description: 'This server\'s math equation rendering is powered by MathBot. For more information about the bot, check out its Discord server! \n \n **Server link**: http://discord.gg/pBfpVyf',
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: 'Homework Help Bot'
			}
		}});
	}
});

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

client.on('message', message => {
  if (message.content === '!tinfo') {
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
      description: '1. Respect others. \n2. Keep all conversations civil. \n3. Avoid over excessive profanity. \n4. Only post safe for work (SFW) and legal content. \n4. Do not post repeating messages in quick succession (spam). \n5. Be serious in all help channels (' 
      + client.channels.get('238956921581862913').toString() + ' and below). \n6. Use the corresponding channels for your question. \n7. Do not advertise other servers or services unless approved by staff.\n8. **After posting your own question, wait for a minimum of 15 minutes before using the helper mention. If nobody has replied by the 15 minutes, repost the question and include a helper mention with or after the question. Only use one ping per question.**\n9. Only ping HWH Staff in the case of an emergency or report.\n10. Unless explicitly given permission, do not direct message other members for help.',
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
      description: '\u2022 If you have a question, **don\'t ask to ask the question, just ask it**. \n\u2022 Instead of merely giving answers, **guide the user through the problem**. \n\u2022 Use `=tex <LaTeX>` to post beautify your math problems! For example, `=tex x^2+2x-1`. \n\u2022 Staff members are in the <@&276969339901444096> role with green names.',
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
      description: 'Want to help out the server?  If you show exceptional contributions to the server, you may be recognized by the roles of <@&267486666292199435> or <@&319948173554745345>. \n\nHolding the <@&267486666292199435> role means that you\'ve demonstrated considerable understanding and knowledge in a certain topic and are active in the pertinent help channels. \n\nHolding the <@&319948173554745345> role means that you have contributed to a challenge, debate or creativity prompt.',
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
  }
});

client.on ('message', message => {
  if (message.content === '!welcome' && message.author.id === '74576452854480896') {
  message.channel.send("", {embed: {
    color: 1271946,
    author: {
      name: 'Hello, welcome to the Homework Help Server!',
    },
    description: 'Have questions on your homework in math, science, English, social studies, or general question?  Want to discuss and share ideas about a subject?  Come join us!',
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: 'Homework Help Bot'
    }
  }});
  }
});

client.login("***REMOVED***");
