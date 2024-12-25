import dotenv from 'dotenv-extended';
import pino from 'pino';

dotenv.load();

const logger = pino({
  level: process.env.LOGGING_LEVEL,
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
