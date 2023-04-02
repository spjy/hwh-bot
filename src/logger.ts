require('dotenv-extended').load();
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: process.env.LOGGING_LEVEL,
});

export default logger;
