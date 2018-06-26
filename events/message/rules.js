const Raven = require('raven');

module.exports = {
  description: 'Sends embed of the rules',
  execute(message, client) {
    const {
      channel
    } = message;

    channel
      .send(
        '',
        {
          embed: {
            color: 15608105,
            author: {
              name: 'Server Rules'
            },
            description: 'In addition to following the [Discord Guidelines](http://dis.gd/guidelines) and [Discord Terms](https://discordapp.com/terms), you must also comply with these rules while on Homework Help:',
            fields: [
              {
                name: 'A. Quality of Life',
                value: '**1) Respect others** — Keep in mind you are speaking to other people. Treat others how you want to be treated.\n'
                  + '**2) Remain civil**  — Maintain civil conversations by displaying a placid demeanor. Don\'t personally attack anyone over their physicality or personality. Avoid over-excessive profanity.\n'
                  + '**3) Don\'t send unsolicited direct messages** — As a courtesy to respect others\' privacy, don\'t send direct messages asking for help unless explicitly given permission.\n'
                  + '**4) Discord name / nickname**  — Your name must precede with a minimum of three alphanumeric characters, remain within the bounds of the message line, and maintain an appropriate appearance.\n'
                  + '**5) Use the `@HWH Staff` mention for reports only.** — In the report, please also include the offender and the offense.\n'
                  + '**6) Don\'t backseat moderate** — Let staff members give the punishments. If you notice a rule breaker, submit a report (reference the previous point (A.5)).\n\u200b'
              },
              {
                name: 'B. Messaging',
                value: '**1) Post clean content only**  — Keep the channels free of NSFW and illegal material.\n'
                  + '**2) Don\'t spam** — Don\'t send repeating, similar or non-pertinent messages in quick succession.\n'
                  + '**3) Don\'t advertise servers, services, or social media without permission** — We want to be sure to scan them for any inappropriate content before posting them.\n\u200b'
              },
              {
                name: 'C. Help Channels',
                value: '**1) Mentioning/Tagging Roles** — After posting your own question, wait a minimum of 15 minutes before using the helper mention. If nobody has replied by the 15 minutes, repost the question and include a helper mention with or after the question. Only use one ping per question (*exception*: if there is a matching sub-topic role, you may include the mentions in one message only, ex. `@Science @Physics`).\n'
                  + '**2) Be serious and encouraging in all help channels.** — We want to promote a sense of credibility when receiving help. Additionally, be encouraging to others, as they are merely trying to learn new things.\n'
                  + '**3) Don\'t cheat or encourage it** — Academic integrity is an ideology we uphold seriously, so do not attempt to encourage cheating. Instead, guide the person through the problem to gain intuition on how to solve it.\n'
                  + '**4) Don\'t offer payment, goods, or services in exchange for having your work done.** — We don\'t want to be held liable for any transactions that occur on this server.\n\u200b'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: 'NOTE: Staff members have the power to take affirmative action in order to maintain a peaceful environment. They have the final say in any situation.'
            }
          }
        }
      )
      .catch(err => Raven.captureException(err));

    message
      .delete()
      .catch(err => Raven.captureException(err));
  }
};
