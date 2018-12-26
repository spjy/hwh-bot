"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _raven = _interopRequireDefault(require("raven"));

var _embed = _interopRequireDefault(require("../../embed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @description Creates an embed containing the user warned and the reason.
 * Triggered through `?gwarn @user reason`.
 * @param {Object} message - The message object instantiating `?gwarn`.
 */
var Warning =
/*#__PURE__*/
function (_Embed) {
  _inherits(Warning, _Embed);

  function Warning(message) {
    _classCallCheck(this, Warning);

    return _possibleConstructorReturn(this, _getPrototypeOf(Warning).call(this, message, 16645888, 'Warning', null, null, 'NOTE: If you wish to clarify or contest this warning, please contact a staff member via direct message (not in channel).'));
  }

  _createClass(Warning, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$message, content, mentions, channel, warn, reason, warned, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this$message = this.message, content = _this$message.content, mentions = _this$message.mentions, channel = _this$message.channel;
                warned = mentions.members.map(function (m) {
                  return m.id;
                });

                if (!warned) {
                  _context.next = 11;
                  break;
                }

                warn = content.split(' ');
                reason = warn.slice(2, warn.length); // Get the third->last array element

                _get(_getPrototypeOf(Warning.prototype), "setDescription", this).call(this, "<@!".concat(warned[0], "> was warned by a staff member."));

                _get(_getPrototypeOf(Warning.prototype), "setFields", this).call(this, [{
                  name: 'Reason',
                  value: warn[2] === undefined ? 'No reason provided.' : reason.join(' ')
                }]);

                _get(_getPrototypeOf(Warning.prototype), "sendToCurrentChannel", this).call(this);

                _context.next = 16;
                break;

              case 11:
                _context.next = 13;
                return channel.send('No mention supplied.');

              case 13:
                error = _context.sent;
                _context.next = 16;
                return setTimeout(function () {
                  error.delete();
                }, 5000);

              case 16:
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);

                _raven.default.captureException(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function execute() {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return Warning;
}(_embed.default);

exports.default = Warning;