import dotenv from 'dotenv-extended';
import Discord from 'discord.js';
import Raven from 'raven';
import dialogflow from 'dialogflow';
import logger from '../../logger';

dotenv.load();

export default {
  description: 'DialogFlow',
  async execute(message: Discord.Message) {
    try {
      const { cleanContent: content, author } = message;

      if (!process.env.DIALOGFLOW_PROJECT_ID) {
        logger.warn('DialogFlow not configured.');
        return;
      }

      const sessionClient = new dialogflow.SessionsClient({
        projectId: process.env.DIALOGFLOW_PROJECT_ID,
        credentials: {
          client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(
            /\\n/g,
            '\n',
          ),
        },
      });

      const sessionPath = sessionClient.sessionPath(
        process.env.DIALOGFLOW_PROJECT_ID,
        author.id,
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: String(content),
            languageCode: 'en-US',
          },
        },
      };

      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;

      await message.reply(result.fulfillmentText);
    } catch (err) {
      Raven.captureException(err);
    }
  },
};
