"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'Suggest role in #suggest-role',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(message, suggestRoleChannel, changeRoleChannel, roleRequestChannel) {
      var content, guild, member, suggestion, validRole, m;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              content = message.cleanContent, guild = message.guild, member = message.member;
              suggestion = content.slice(1); // get first part of string (command)

              validRole = guild.roles.map(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(role) {
                  var name;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          name = role.name;

                          if (!(suggestion.toLowerCase() === name.toLowerCase())) {
                            _context.next = 5;
                            break;
                          }

                          _context.next = 4;
                          return member.guild.channels.get(suggestRoleChannel).send("Role already exists. You can add it in <#".concat(changeRoleChannel, ">."));

                        case 4:
                          return _context.abrupt("return", true);

                        case 5:
                          return _context.abrupt("return", false);

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());

              if (validRole.includes(true)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 7;
              return message.reply("suggested role ".concat(suggestion, " received."));

            case 7:
              _context2.next = 9;
              return guild.channels.get(roleRequestChannel).send(suggestion);

            case 9:
              m = _context2.sent;
              _context2.next = 12;
              return m.react('😁');

            case 12:
              _context2.next = 14;
              return m.react('❌');

            case 14:
              _context2.next = 16;
              return message.delete();

            case 16:
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](0);
              Raven.captureException(_context2.t0);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 18]]);
    }));

    function execute(_x, _x2, _x3, _x4) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};