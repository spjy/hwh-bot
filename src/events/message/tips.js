import Embed from '../../embed';

/**
 * Sends tips in an embed to the current channel. Triggered by `?tips`.
 */

export default class Tips extends Embed {
  /**
   * @param {Object} message - The message object instantiating `?tips`.
   */
  constructor(message) {
    super({
      message,
      color: 15608105,
      title: 'Tips',
      description: 'Welcome to the Homework Help Discord Server!',
      fields: [
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
            + '• `@Staff @USER OFFENSE` to submit a report.\n'
            + '• `?t1e` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n'
            + '**B) Direct Message Commands** —\n'
            + '• `>c <challenge id> <work>` for event submissions.\n'
            + '**C) Source code**: https://github.com/spjy/hwh-bot\n\u200b'
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
          value: '**A)** First, post your question in the channel you want to mention in along with an attachment if needed. The bot will mention the message you previously sent.\n'
          + '**B)** Immediately after doing step A, use `?mention role1 [role2]` where `role1` is the name of the role you want to ping without the `@`, and `role2` has the same format but it is optional.\n'
          + '**C)** You may use up to two related roles, e.g. `Math Algebra`.\n'
          + '**D)** For roles with multiple words, separate them with a `-`, e.g. Social-Science\n'
          + '**E)** After 10 minutes, you may use `?mention` to redeem your key in the same channel you used the command.\n'
          + '**F)** To cancel a mention, type `?mention cancel`.\n'
          + '**G)** Example: `?mention Social-Science Psychology`\n'
          + '**Note**: Be aware of rule 3D: If you use a help mention, you must include the majority of the question in the ping message.\n\u200b'
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
      footer: 'Homework Help Bot'
    });
  }

  /**
   * The main function to run.
   */
  execute() {
    super.sendToCurrentChannel();
  }
}
