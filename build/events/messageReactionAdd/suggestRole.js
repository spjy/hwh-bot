"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'Suggest role approval in #role-request',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(reaction, user, suggestRoleChannel, roleRequestChannel) {
      var content, message, guild, emoji, channels;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              content = reaction.cleanContent, message = reaction.message, guild = reaction.guild, emoji = reaction.emoji;
              channels = guild.channels; // Igonore addition of own emoji.

              if (!(message.client.user.id !== user.id)) {
                _context.next = 22;
                break;
              }

              if (!(emoji.name === '😁')) {
                _context.next = 15;
                break;
              }

              _context.next = 7;
              return guild.createRole({
                name: content,
                color: 9807270,
                mentionable: true
              });

            case 7:
              _context.next = 9;
              return message.delete();

            case 9:
              _context.next = 11;
              return channels.get(roleRequestChannel).send("Added ".concat(content, " role."));

            case 11:
              _context.next = 13;
              return channels.get(suggestRoleChannel).send("Suggested role ".concat(content, " was approved."));

            case 13:
              _context.next = 22;
              break;

            case 15:
              if (!(emoji.name === '❌')) {
                _context.next = 22;
                break;
              }

              _context.next = 18;
              return message.delete();

            case 18:
              _context.next = 20;
              return channels.get(roleRequestChannel).send("Rejected '".concat(content, "' role."));

            case 20:
              _context.next = 22;
              return channels.get(suggestRoleChannel).send("Suggested role ".concat(content, " was not approved."));

            case 22:
              _context.next = 27;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](0);
              Raven.captureException(_context.t0);

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 24]]);
    }));

    function execute(_x, _x2, _x3, _x4) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};