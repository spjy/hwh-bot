const Raven = require('raven');

module.exports = {
  description: 'Sends an embed of the tips',
  async execute(message, client) {
    try {
      const {
        channel
      } = message;

      await channel
        .send(
          '',
          {
            embed: {
              color: 15608105,
              author: {
                name: 'Tips'
              },
              description: 'Welcome to the Homework Help Discord Server!',
              fields: [
                {
                  name: 'A. Getting Started',
                  value: '**1) Familiarize yourself with the rules** so you don\'t get in trouble.\n'
                    + '**2) Introduce yourself** Say hello in <#238956364729155585> and talk a little about yourself!\n'
                    + '**3) Get a shiny new role** to display what you can help the most with in <#275071813992710144>.\n'
                    + '**4) Start a discussion or ask for help** in the respective channels.\n'
                    + '**5) If you have a question, don\'t hesitate to ask it.** To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\n'
                    + '**6) Display your knowledge** in one of our events <#446166388235829248>.\n\u200b'
                },
                {
                  name: 'B. HWH Bot',
                  value: '**1) Server Commands** —\n'
                    + '• `@HWH Staff <@USER> <OFFENSE>` to submit a report.\n'
                    + '• `?ta5` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n'
                    + '**2) Direct Message Commands** —\n'
                    + '• `>c <challenge id> <work>` for event submissions.\n\u200b'
                    + 'Source code: https://github.com/spjy/hwh-bot'
                },
                {
                  name: 'C. MathBot',
                  value: '**1) LaTeX Renderer** — You can beautify your math by converting LaTeX into beautiful images. Use `=tex your LaTeX code here`.\n'
                    + '**2) Wolfram Alpha Queryer** — Use MathBot to query Wolfram Alpha for mathematical computations or other knowledge. Use `=wolf wolfram alpha query`. Only usable in #spam-channel.\n\u200b'
                },
                {
                  name: 'D. Contributing',
                  value: '**1) Valued Contributor** — If you display considerable knowledge, activity and maturity in the help channels, you will be recognized as a valued contributor.\n'
                    + '**2) Event Contributor** — If you have contributed a prompt to one of the Homework Help Events, you will receive this role.\n\u200b'
                },
                {
                  name: 'E. Staff Positions',
                  value: '**1) Moderators** keep the peace of the server and complete various tasks that need to be done around the server.\n'
                    + '**2) Guides** also keep the peace of the server. They welcome people, answer people\'s questions about the server and warn people of rule offenses.\n'
                    + '**3) Event Managers** organize events and create prompts for them.\n'
                    + '**Applying for staff** — If you want to apply for Guide or Event Manager, apply here: <https://goo.gl/forms/Z3mVQwLdiNZcKHx52>\n\u200b'
                },
                {
                  name: 'F. Sharing the server',
                  value: 'The more people that join, the more knowledge that can be shared! Consequently, I encourage everybody to share the server with your friends!\n\nShare link: https://discord.gg/YudDZtb'
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: 'Homework Help Bot'
              }
            }
          }
        );

      await message
        .delete();
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
