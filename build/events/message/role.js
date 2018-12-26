"use strict";

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.trim");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'Role adding/removing in #change-role',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(message) {
      var content, guild, member, author, command, selectedRole, validRole;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              content = message.content, guild = message.guild, member = message.member, author = message.author;
              command = content.slice(0, 1).toLowerCase(); // get first part of string (command)

              selectedRole = content.slice(1).trim().toLowerCase(); // get the rest of the string

              if (selectedRole.includes('-')) {
                selectedRole = selectedRole.replace(/-/g, ' '); // replace dash with space if contained.
              } // Run through roles and check stipulations


              _context2.next = 7;
              return Promise.all(guild.roles.map(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(role) {
                  var id, name, color;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          id = role.id, name = role.name, color = role.color;

                          if (!(selectedRole === name.toLowerCase() && (color === 9807270 || color === 16770276 || color === 16760511 || color === 16741498 || color === 12713987 || color === 9240581 || color === 12596388))) {
                            _context.next = 25;
                            break;
                          }

                          if (!(command === '+' && selectedRole === name.toLowerCase())) {
                            _context.next = 14;
                            break;
                          }

                          if (!member.roles.has(id)) {
                            _context.next = 8;
                            break;
                          }

                          _context.next = 6;
                          return message.reply("error! You are already in the **".concat(name, "** role!"));

                        case 6:
                          _context.next = 12;
                          break;

                        case 8:
                          _context.next = 10;
                          return guild.member(author.id).addRole(id);

                        case 10:
                          _context.next = 12;
                          return message.reply("you have added the **".concat(name, "** role!"));

                        case 12:
                          _context.next = 24;
                          break;

                        case 14:
                          if (!(command === '-' && selectedRole === name.toLowerCase())) {
                            _context.next = 24;
                            break;
                          }

                          if (!member.roles.has(id)) {
                            _context.next = 22;
                            break;
                          }

                          _context.next = 18;
                          return guild.member(author.id).removeRole(id);

                        case 18:
                          _context.next = 20;
                          return message.reply("you have removed the **".concat(name, "** role!"));

                        case 20:
                          _context.next = 24;
                          break;

                        case 22:
                          _context.next = 24;
                          return message.reply("error! You are not in the **".concat(name, "** role!"));

                        case 24:
                          return _context.abrupt("return", true);

                        case 25:
                          return _context.abrupt("return", false);

                        case 26:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));

            case 7:
              validRole = _context2.sent;

              if (validRole.includes(true)) {
                _context2.next = 11;
                break;
              }

              _context2.next = 11;
              return message.reply('invalid role. See the pins for a comprehensive list.');

            case 11:
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              Raven.captureException(_context2.t0);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 13]]);
    }));

    function execute(_x) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};