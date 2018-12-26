"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.starts-with");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'DM Commands (>h, >c, ?ta5)',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message, client, botMessagesChannel) {
      var content, channel, operator;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              content = message.cleanContent, channel = message.channel;
              operator = '>';

              if (!(content.startsWith("".concat(operator, "challenge")) || content.startsWith("".concat(operator, "c")))) {
                _context.next = 10;
                break;
              }

              _context.next = 6;
              return client.channels.get(botMessagesChannel).send("*Challenge Entry* from **".concat(channel.recipient, "**: ").concat(content));

            case 6:
              _context.next = 8;
              return message.reply('Successfully sent!');

            case 8:
              _context.next = 13;
              break;

            case 10:
              if (!(content.startsWith("".concat(operator, "help")) || content.startsWith("".concat(operator, "h")))) {
                _context.next = 13;
                break;
              }

              _context.next = 13;
              return message.reply('I am a functional bot for the Homework Help Server!' + ' Here is a list of command(s):\n\n' + '**>c** <challenge ID> <link/attachment to your solution> - entering work for the challenge problem.\n');

            case 13:
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              Raven.captureException(_context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 15]]);
    }));

    function execute(_x, _x2, _x3) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};