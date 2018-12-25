const Log = require('../../log.js');

module.exports = {
  description: 'Sends ban message in #server-log',
  execute(guild, user, serverLogChannel) {
    Log(guild, user, serverLogChannel, 'was **banned**').logAction();
  }
};
