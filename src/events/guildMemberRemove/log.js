const Log = require('../../log.js');

module.exports = {
  description: 'Sends leave message in #server-log',
  execute(guild, user, serverLogChannel) {
    Log(guild, user, serverLogChannel, 'has **left**').logAction();
  }
};
