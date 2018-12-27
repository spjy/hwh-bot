import Embed from '../../embed';

/**
 * @description Sends tips in an embed to the current channel. Triggered by `?tips`.
 * @param {Object} message - The message object instantiating `?tips`.
 */

export default class Tips extends Embed {
  constructor(message) {
    super(
      message,
      15608105,
      'Tips',
      'Welcome to the Homework Help Discord Server!',
      [
        {
          name: '1. Getting Started',
          value: '**A) Familiarize yourself with the rules** so you don\'t get in trouble.\n'
            + '**B) Introduce yourself** Say hello in <#238956364729155585> and talk a little about yourself!\n'
            + '**C) Get a shiny new role** to display what you can help the most with in <#275071813992710144>.\n'
            + '**D) Start a discussion or ask for help** in the respective channels.\n'
            + '**E) If you have a question, don\'t hesitate to ask it.** To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\n'
            + '**F) Display your knowledge** in one of our events <#446166388235829248>.\n\u200b'
            + '**G) Post what you have experience with** in <#450080745499656223> and look for others with similar interests.\n\u200b'
        },
        {
          name: '2. HWH Bot',
          value: '**A) Server Commands** —\n'
            + '• `@Staff <@USER> <OFFENSE>` to submit a report.\n'
            + '• `?t5a` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n'
            + '**B) Direct Message Commands** —\n'
            + '• `>c <challenge id> <work>` for event submissions.\n\u200b'
            + '**C) Source code**: https://github.com/spjy/hwh-bot \u200b'
        },
        {
          name: '3. MathBot',
          value: '**A) LaTeX Renderer** — You can beautify your math by converting LaTeX into beautiful images. Use `=tex your LaTeX code here`.\n'
            + '**B) Wolfram Alpha Queryer** — Use MathBot to query Wolfram Alpha for mathematical computations or other knowledge. Use `=wolf wolfram alpha query`. Only usable in #spam-channel.\n\u200b'
        },
        {
          name: '4. Contributing',
          value: '**A) Valued Contributor** — If you display considerable knowledge, activity and maturity in the help channels, you will be recognized as a valued contributor.\n'
            + '**B) Event Contributor** — If you have contributed a prompt to one of the Homework Help Events, you will receive this role.\n\u200b'
        },
        {
          name: '5. Staff Positions',
          value: '**A) Moderators** keep the peace of the server and complete various tasks that need to be done around the server.\n'
            + '**B) Guides** also keep the peace of the server. They welcome people, answer people\'s questions about the server and warn people of rule offenses.\n'
            + '**C) Event Managers** organize events and create prompts for them.\n'
            + '**D) Applying for staff** — If you want to apply for Guide or Event Manager, apply here: <https://goo.gl/forms/Z3mVQwLdiNZcKHx52>\n\u200b'
        },
        {
          name: '6. Help Mentioning',
          value: '**A)** Use `?mention <message id of question> <role>[ <role>]` in the channel you want to mention in to create a \'key\'.\n'
          + '**B)** You may use up to two related pings, e.g. Math Algebra.\n'
          + '**C)** For roles with multiple words, separate them with `-`, e.g. Social-Science\n'
          + '**D)** After 15 minutes, you may use `?mention` to redeem your key in the same channel you used the command.\n'
          + '**E)** To cancel a mention, type `?mention cancel`. \n'
          + '**F)** Example: `?mention 484484358879707136 Social-Science Psychology` \n'
          + 'To get your message ID, follow: https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID- \n\u200b'
        },
        {
          name: '7. Partnering & Advertising',
          value: '**A) To be eligible to be a partner, you must have:**\n'
          + '• At least 1/4 of Homework Help\'s members.\n'
          + '• Less than 15 partners.\n'
          + '• Our server and invite link be posted in a channel to recognize the partnership (and not under an NSFW lock).\n'
          + '**B)** If you do not fulfill the above requirements, your server will be posted in #advertise. If you do, it will be posted in #partners.\n'
          + '**C) Applying for partnership or to advertise**: https://goo.gl/forms/ltqYN19xlYZ2HuXq1 \n\u200b'
        },
        {
          name: '8. Sharing the server',
          value: 'The more people that join, the more knowledge that can be shared! Consequently, I encourage everybody to share the server with your friends!\n\nShare link: https://discord.gg/YudDZtb'
        }
      ],
      'Homework Help Bot'
    );
  }

  execute() {
    super.sendToCurrentChannel();
  }
}
