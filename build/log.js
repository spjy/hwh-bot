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
 * Log an action to a specified channel.
 * @param {Object} guild - The guild where the event was fired.
 * @param {Object} user - The user instantiating the event.
 * @param {string} channel - The channel that will contain the logged message.
 * @param {string} [prefix = ''] - A prefix before the log.
 * @param {string} [message = ''] - A message describing the log, to be appended at the end.
 */


var Log =
/*#__PURE__*/
function () {
  function Log(guild, user, channel) {
    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var message = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    _classCallCheck(this, Log);

    this.guild = guild;
    this.user = user;
    this.channel = channel;
    this.message = message;
    this.prefix = prefix;
  }

  _createClass(Log, [{
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
    }
  }, {
    key: "setPrefix",
    value: function setPrefix(prefix) {
      this.prefix = prefix;
    }
  }, {
    key: "logAction",
    value: function () {
      var _logAction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var channels, _this$user, username, discriminator;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                channels = this.guild.channels;
                _this$user = this.user, username = _this$user.username, discriminator = _this$user.discriminator;
                _context.next = 5;
                return channels.get(this.channel).send("".concat(this.prefix).concat(this.user, " (").concat(username, "#").concat(discriminator, ") ").concat(this.message, "."));

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

      function logAction() {
        return _logAction.apply(this, arguments);
      }

      return logAction;
    }()
  }]);

  return Log;
}();

exports.default = Log;