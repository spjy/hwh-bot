"use strict";

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.string.trim");

require("core-js/modules/es6.regexp.split");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raven = require('raven');

module.exports = {
  description: 'Mentioning system - ?mention <message ID> <role>[ <role>]',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(message, helpMentions, mentionLogChannel) {
      var content, channel, author, guild, mention, setting, mentions, helpMention, helpChannel, helpDate, helpUserMentions, helpMessage, cooldown, expiration, rolesToMention, m;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              content = message.cleanContent, channel = message.channel, author = message.author, guild = message.guild; // Get message id, mentions (limit of 2)

              mention = content.trim().split(' ');
              setting = mention[1]; // cancel or message id

              mentions = mention.slice(2, 4); // Check collection to see if they have a key pending

              helpMention = helpMentions.get(author.id); // Check if only ?mention

              if (setting) {
                _context3.next = 51;
                break;
              }

              if (!helpMention) {
                _context3.next = 45;
                break;
              }

              helpChannel = helpMention.channel, helpDate = helpMention.date, helpUserMentions = helpMention.mentions, helpMessage = helpMention.message; // 15 minutes

              cooldown = helpDate + 900000; // Expiration time - 60 minutes

              expiration = helpDate + 3600000; // Check if matching channels and if 15 minutes later

              if (!(helpChannel === channel.id && cooldown <= Date.now())) {
                _context3.next = 23;
                break;
              }

              _context3.next = 14;
              return Promise.all(helpUserMentions.map(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(m) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return m.setMentionable(true);

                        case 2:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));

                return function (_x4) {
                  return _ref.apply(this, arguments);
                };
              }()));

            case 14:
              _context3.next = 16;
              return message.guild.channels.get(helpChannel).send("".concat(helpUserMentions.join(' '), " <@").concat(author.id, "> ").concat(helpMessage));

            case 16:
              // Reset collection
              helpMentions.set(author.id, undefined); // Set unmentionable

              _context3.next = 19;
              return Promise.all(helpUserMentions.map(
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2(m) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return m.setMentionable(false);

                        case 2:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x5) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 19:
              _context3.next = 21;
              return guild.channels.get(mentionLogChannel).send("[Used] <@".concat(author.id, "> <#").concat(helpChannel, "> ").concat(helpMentions, " ").concat(helpMessage));

            case 21:
              _context3.next = 43;
              break;

            case 23:
              if (!(helpChannel === channel.id && cooldown > Date.now())) {
                _context3.next = 30;
                break;
              }

              _context3.next = 26;
              return message.reply('the cooldown time (15 minutes) has not elapsed yet.');

            case 26:
              _context3.next = 28;
              return guild.channels.get(mentionLogChannel).send("[Use attempt (cooldown)] <@".concat(author.id, "> <#").concat(helpChannel, ">"));

            case 28:
              _context3.next = 43;
              break;

            case 30:
              if (!(helpChannel === channel.id && Date.now() >= expiration)) {
                _context3.next = 38;
                break;
              }

              helpMentions.set(author.id, undefined);
              _context3.next = 34;
              return message.reply('your key has expired. Generate a new one.');

            case 34:
              _context3.next = 36;
              return guild.channels.get(mentionLogChannel).send("[Expired] <@".concat(author.id, "> <#").concat(helpChannel, "> ").concat(helpMentions, " ").concat(helpMessage));

            case 36:
              _context3.next = 43;
              break;

            case 38:
              if (!(helpChannel !== channel.id)) {
                _context3.next = 43;
                break;
              }

              _context3.next = 41;
              return message.reply("the channel you generated your key is in <#".concat(helpChannel, ">. Use the command there."));

            case 41:
              _context3.next = 43;
              return guild.channels.get(mentionLogChannel).send("[Use attempt (incorrect channel)] <@".concat(author.id, "> <#").concat(helpChannel, "> ").concat(helpMentions, " ").concat(helpMessage));

            case 43:
              _context3.next = 49;
              break;

            case 45:
              _context3.next = 47;
              return message.reply('you do not have a key generated. Use `?mention <message id> <role>[ <role>]` to do so.');

            case 47:
              _context3.next = 49;
              return guild.channels.get(mentionLogChannel).send("[Use attempt (no key)] <@".concat(author.id, ">"));

            case 49:
              _context3.next = 83;
              break;

            case 51:
              if (!(Number(setting) > 0 && !helpMention)) {
                _context3.next = 71;
                break;
              }

              rolesToMention = []; // Check for role by name and push Guild object to array

              mentions.forEach(function (m) {
                guild.roles.forEach(function (role) {
                  var name = role.name,
                      color = role.color;

                  if (m.toLowerCase().replace(/-/g, ' ') === name.toLowerCase() && color === 9807270) {
                    rolesToMention.push(role);
                  }
                });
              }); // Check if contains any valid roles

              if (!(rolesToMention.length === 0)) {
                _context3.next = 61;
                break;
              }

              _context3.next = 57;
              return message.reply('the role(s) you have included are invalid.');

            case 57:
              _context3.next = 59;
              return guild.channels.get(mentionLogChannel).send("[Generation (incorrect role(s))] <@".concat(author.id, "> <#").concat(channel.id, "> ").concat(mentions, " ").concat(setting));

            case 59:
              _context3.next = 69;
              break;

            case 61:
              _context3.next = 63;
              return channel.fetchMessage(setting);

            case 63:
              m = _context3.sent;
              helpMentions.set(author.id, {
                channel: channel.id,
                date: Date.now(),
                mentions: rolesToMention,
                message: m.cleanContent
              });
              _context3.next = 67;
              return message.reply("you have generated a key for message ID ".concat(setting, ". ") + "It'll mention ".concat(rolesToMention[0] ? rolesToMention[0].name : '').concat(rolesToMention[1] ? " and ".concat(rolesToMention[1].name) : '', "."));

            case 67:
              _context3.next = 69;
              return guild.channels.get(mentionLogChannel).send("[Generation] <@".concat(author.id, "> ").concat(setting, " <#").concat(channel.id, "> ").concat(mentions));

            case 69:
              _context3.next = 83;
              break;

            case 71:
              if (!(setting.toLowerCase() === 'cancel')) {
                _context3.next = 79;
                break;
              }

              helpMentions.set(author.id, undefined);
              _context3.next = 75;
              return message.reply('your previously generated key has been cancelled.');

            case 75:
              _context3.next = 77;
              return guild.channels.get(mentionLogChannel).send("[Cancel] <@".concat(author.id, "> <#").concat(channel.id, "> ").concat(mentions, " ").concat(setting));

            case 77:
              _context3.next = 83;
              break;

            case 79:
              _context3.next = 81;
              return message.reply('incorrect format. Use `?mention <message id> <role>[ <role>]` to generate a key or `?mention cancel` to cancel.');

            case 81:
              _context3.next = 83;
              return guild.channels.get(mentionLogChannel).send("[Generation attempt (incorrect format)] <@".concat(author.id, "> <#").concat(channel.id, "> ").concat(mentions, " ").concat(setting));

            case 83:
              _context3.next = 85;
              return message.delete();

            case 85:
              _context3.next = 90;
              break;

            case 87:
              _context3.prev = 87;
              _context3.t0 = _context3["catch"](0);
              Raven.captureException(_context3.t0);

            case 90:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 87]]);
    }));

    function execute(_x, _x2, _x3) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};