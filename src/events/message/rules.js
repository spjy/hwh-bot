import Embed from '../../embed';

/**
 * @description Sends rules in an embed to the current channel. Triggered by `?rules`.
 * @param {Object} message - The message object instantiating `?rules`.
 */

export default class Rules extends Embed {
  constructor(message) {
    super({
      message,
      color: 15608105,
      title: 'Server Rules',
      description: 'In addition to following the [Discord Guidelines](http://dis.gd/guidelines) and [Discord Terms](https://discordapp.com/terms), you must also comply with these rules while on Homework Help:',
      fields: [
        {
          name: '1. Quality of Life',
          value: '**A) Respect others** — Keep in mind you are speaking to other people. Treat others how you want to be treated.\n'
            + '**B) Remain civil**  — Maintain civil conversations by displaying a placid demeanor. Don\'t personally attack anyone over their physicality or personality. Avoid over-excessive profanity.\n'
            + '**C) Discord name / nickname**  — Your name must precede with a minimum of three QWERTY keyboard characters, remain within the bounds of the message line, and maintain an appropriate appearance.\n'
            + '**D) Use the `@Staff` mention for reports only.** — In the report, please also include the offender and the offense.\n'
            + '**E) Don\'t backseat moderate** — Let staff members give the punishments. If you notice a rule breaker, submit a report (reference the previous point (A.4)).\n'
            + '**F) Age requirement** — Though you should be aware of Discord\'s age requirement, we reiterate that you must be at least thirteen (13) years old to use Discord and to be in this server. No exceptions.\n\u200b'
        },
        {
          name: '2. Messaging',
          value: '**A) Post clean content only**  — Keep the channels free of NSFW and illegal material.\n'
            + '**B) Don\'t spam** — Don\'t send repeating, similar or non-pertinent messages in quick succession.\n'
            + '**C) Don\'t advertise servers, services, or social media without permission** — We want to be sure to scan them for any inappropriate content before posting them.\n'
            + '**D) Don\'t offer payment, goods, or services in exchange for having your work done.** — We don\'t want to be held liable for any transactions that occur on this server.\n'
            + '**E) Don\'t send unsolicited direct messages** — As a courtesy to respect others\' privacy, don\'t send direct messages asking for help unless explicitly given permission.\n\u200b'
        },
        {
          name: '3. Help Channels',
          value: '**A) Be serious and encouraging in all help channels.** — We want to promote a sense of credibility when receiving help. Additionally, be encouraging to others, as they are merely trying to learn new things.\n'
            + '**B) Don\'t cheat or encourage it** — Academic integrity is an ideology we uphold seriously, so do not attempt to encourage cheating. Instead, guide the person through the problem to gain intuition on how to solve it.\n'
            + '**C) Only post one instance of your question** (ex. if you post your question in #math, you cannot post it in any other channel). This is to avoid double helping.\n\u200b'
        }
      ],
      footer: 'NOTE: Staff members have the power to take affirmative action in order to maintain a peaceful environment. They have the final say in any situation.'
    });
  }

  execute() {
    super.sendToCurrentChannel();
  }
}
