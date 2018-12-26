"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'On @Staff, delete msg and send message in private channel.',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, reportsChannel, staffRoleId) {
      var content, author, guild, channel, client, report, reportMessage, m;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              content = message.cleanContent, author = message.author, guild = message.guild, channel = message.channel, client = message.client;
              report = message.mentions.roles // Extract roles in message
              .map(function (role) {
                return role.id;
              });

              if (!report.includes(staffRoleId)) {
                _context.next = 14;
                break;
              }

              _context.next = 6;
              return guild.channels.get(channel.id).send('Thank you for your report. We will review it shortly.');

            case 6:
              reportMessage = _context.sent;
              _context.next = 9;
              return message.guild.channels.get(reportsChannel) // Send information to report channel
              .send('', {
                embed: {
                  color: 16645888,
                  author: {
                    name: 'Report'
                  },
                  description: '',
                  fields: [{
                    name: 'Reporter',
                    value: "".concat(author),
                    inline: true
                  }, {
                    name: 'Channel',
                    value: "".concat(channel),
                    inline: true
                  }, {
                    name: 'Message',
                    value: "".concat(content)
                  }, {
                    name: 'Jump to report',
                    value: "https://discordapp.com/channels/".concat(guild.id, "/").concat(reportMessage.channel.id, "/").concat(reportMessage.id)
                  }],
                  timestamp: new Date(),
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: 'Homework Help'
                  }
                }
              });

            case 9:
              m = _context.sent;
              _context.next = 12;
              return m.react('😁');

            case 12:
              _context.next = 14;
              return message.delete();

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              Raven.captureException(_context.t0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 16]]);
    }));

    function execute(_x, _x2, _x3) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};