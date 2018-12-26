"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Raven = require('raven');
/**
 * @description Send an embed to a specified channel.
 * @param {Object} message - The message being sent.
 * @param {Number} color - The color of the side of the embed.
 * @param {string} title - The title of the embed (at the very top).
 * @param {string} [description = ''] - The description of the embed (after the title).
 * @param {Array} fields - The fields of the embed.
 * @param {string} [footer = 'Homework Help Bot'] - The message at the footer of the embed.
 * @param {string} [channelToSend = ''] - The channel to send the embed.
 * @param {string} [preembed = ''] - Content before the mention.
 */


var Embed =
/*#__PURE__*/
function () {
  function Embed(message, color, title) {
    var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var fields = arguments.length > 4 ? arguments[4] : undefined;
    var footer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'Homework Help Bot';
    var channelToSend = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
    var preembed = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';

    _classCallCheck(this, Embed);

    var channel = message.channel,
        guild = message.guild;
    this.message = message;
    this.content = {
      embed: {
        color: color,
        author: {
          name: title
        },
        description: description,
        fields: fields,
        timestamp: new Date(),
        footer: {
          icon_url: message.client.user.avatarURL,
          text: footer
        }
      }
    };
    this.channel = channel;
    this.guild = guild;
    this.channelToSend = channelToSend;
    this.preembed = preembed;
  }
  /**
   * @description Sets the preembed value.
   * @param {string} preembed
   */


  _createClass(Embed, [{
    key: "setPreembed",
    value: function setPreembed(preembed) {
      this.preembed = preembed;
    }
    /**
     * @description Sets the preembed value.
     * @param {string} title
     */

  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.content.embed.author.name = title;
    }
    /**
     * @description Sets the description value.
     * @param {string} description
     */

  }, {
    key: "setDescription",
    value: function setDescription(description) {
      this.content.embed.description = description;
    }
    /**
     * @description Sets the fields value.
     * @param {Array} fields
     */

  }, {
    key: "setFields",
    value: function setFields(fields) {
      this.content.embed.fields = fields;
    }
    /**
     * @description Sets the footer value.
     * @param {*} footer
     */

  }, {
    key: "setFooter",
    value: function setFooter(footer) {
      this.content.embed.footer.text = footer;
    }
    /**
     * @description Method to send the embed to the current channel of instantiation.
     */

  }, {
    key: "sendToCurrentChannel",
    value: function () {
      var _sendToCurrentChannel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.channel.send(this.preembed, this.content);

              case 3:
                _context.next = 5;
                return this.message.delete();

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                Raven.captureException(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function sendToCurrentChannel() {
        return _sendToCurrentChannel.apply(this, arguments);
      }

      return sendToCurrentChannel;
    }()
    /**
     * @description Method to send the embed to a specified channel.
     */

  }, {
    key: "sendToDifferentChannel",
    value: function () {
      var _sendToDifferentChannel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.guild.channels.get(this.channelToSend).send(this.preembed, this.content);

              case 3:
                _context2.next = 5;
                return this.message.delete();

              case 5:
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                Raven.captureException(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function sendToDifferentChannel() {
        return _sendToDifferentChannel.apply(this, arguments);
      }

      return sendToDifferentChannel;
    }()
  }]);

  return Embed;
}();

exports.default = Embed;