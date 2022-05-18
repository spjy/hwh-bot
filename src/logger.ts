require('dotenv-extended').load();
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
  level: process.env.LOGGING_LEVEL,
});

export default logger;
