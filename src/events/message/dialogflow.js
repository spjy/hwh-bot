require('dotenv-extended').load();
const Raven = require('raven');
const dialogflow = require('dialogflow');

module.exports = {
  description: 'DialogFlow',
  async execute(message) {
    try {
      const {
        cleanContent: content,
        author
      } = message;

      if (!process.env.DIALOGFLOW_PROJECT_ID) {
        // eslint-disable-next-line
        console.warn('DialogFlow not configured.');
        return;
      }

      const sessionClient = new dialogflow.SessionsClient({
        projectId: process.env.DIALOGFLOW_PROJECT_ID,
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
        }
      });

      const sessionPath = sessionClient.sessionPath(
        process.env.DIALOGFLOW_PROJECT_ID, author.id
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: String(content),
            languageCode: 'en-US'
          }
        }
      };

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      await message.reply(result.fulfillmentText);
    } catch (err) {
      Raven.captureException(err);
    }
  }
};
