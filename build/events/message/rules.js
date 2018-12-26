"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _embed = _interopRequireDefault(require("../../embed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
 * @description Sends rules in an embed to the current channel. Triggered by `?rules`.
 * @param {Object} message - The message object instantiating `?rules`.
 */
var Rules =
/*#__PURE__*/
function (_Embed) {
  _inherits(Rules, _Embed);

  function Rules(message) {
    _classCallCheck(this, Rules);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rules).call(this, message, 15608105, 'Server Rules', 'In addition to following the [Discord Guidelines](http://dis.gd/guidelines) and [Discord Terms](https://discordapp.com/terms), you must also comply with these rules while on Homework Help:', [{
      name: '1. Quality of Life',
      value: '**A) Respect others** — Keep in mind you are speaking to other people. Treat others how you want to be treated.\n' + '**B) Remain civil**  — Maintain civil conversations by displaying a placid demeanor. Don\'t personally attack anyone over their physicality or personality. Avoid over-excessive profanity.\n' + '**C) Discord name / nickname**  — Your name must precede with a minimum of three alphanumeric characters, remain within the bounds of the message line, and maintain an appropriate appearance.\n' + '**D) Use the `@Staff` mention for reports only.** — In the report, please also include the offender and the offense.\n' + '**E) Don\'t backseat moderate** — Let staff members give the punishments. If you notice a rule breaker, submit a report (reference the previous point (A.4)).\n' + "**F) Age requirement** \u2014 Though you should be aware of Discord's age requirement, we reiterate that you must be at least thirteen (13) years old to use Discord and to be in this server. No exceptions.\n\u200B"
    }, {
      name: '2. Messaging',
      value: '**A) Post clean content only**  — Keep the channels free of NSFW and illegal material.\n' + '**B) Don\'t spam** — Don\'t send repeating, similar or non-pertinent messages in quick succession.\n' + '**C) Don\'t advertise servers, services, or social media without permission** — We want to be sure to scan them for any inappropriate content before posting them.\n' + '**D) Don\'t offer payment, goods, or services in exchange for having your work done.** — We don\'t want to be held liable for any transactions that occur on this server.\n' + "**E) Don't send unsolicited direct messages** \u2014 As a courtesy to respect others' privacy, don't send direct messages asking for help unless explicitly given permission.\n\u200B"
    }, {
      name: '3. Help Channels',
      value: '**A) Be serious and encouraging in all help channels.** — We want to promote a sense of credibility when receiving help. Additionally, be encouraging to others, as they are merely trying to learn new things.\n' + '**B) Don\'t cheat or encourage it** — Academic integrity is an ideology we uphold seriously, so do not attempt to encourage cheating. Instead, guide the person through the problem to gain intuition on how to solve it.\n' + "**C) Only post one instance of your question** (ex. if you post your question in #math, you cannot post it in any other channel). This is to avoid double helping.\n\u200B"
    }], 'NOTE: Staff members have the power to take affirmative action in order to maintain a peaceful environment. They have the final say in any situation.'));
  }

  _createClass(Rules, [{
    key: "execute",
    value: function execute() {
      _get(_getPrototypeOf(Rules.prototype), "sendToCurrentChannel", this).call(this);
    }
  }]);

  return Rules;
}(_embed.default);

exports.default = Rules;