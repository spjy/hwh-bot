const Log = require('../../log.js');

module.exports = {
  description: 'Sends join message in #server-log',
  execute(guild, user, serverLogChannel) {
    Log(guild, user, serverLogChannel, 'has **joined**').logAction();
  }
};
