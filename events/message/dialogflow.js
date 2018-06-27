require('dotenv-extended').load();
const Raven = require('raven');
const dialogflow = require('dialogflow');

const sessionClient = new dialogflow.SessionsClient({
  projectId: process.env.DIALOGFLOW_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

module.exports = {
  description: 'DialogFlow',
  execute(message) {
    const {
      cleanContent: content,
      author
    } = message;

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

    sessionClient.detectIntent(request)
      .then((responses) => {
        const result = responses[0].queryResult;
        message.reply(result.fulfillmentText);
      })
      .catch(err => Raven.captureException(err));
  }
};
