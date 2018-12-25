const Log = require('../../log.js');

module.exports = {
  description: 'Sends unban message in #server-log',
  execute(guild, user, serverLogChannel) {
    Log(guild, user, serverLogChannel, 'was **unbanned**').logAction();
  }
};
