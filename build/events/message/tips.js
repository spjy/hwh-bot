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
 * @description Sends tips in an embed to the current channel. Triggered by `?tips`.
 * @param {Object} message - The message object instantiating `?tips`.
 */
var Tips =
/*#__PURE__*/
function (_Embed) {
  _inherits(Tips, _Embed);

  function Tips(message) {
    _classCallCheck(this, Tips);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tips).call(this, message, 15608105, 'Tips', 'Welcome to the Homework Help Discord Server!', [{
      name: '1. Getting Started',
      value: '**A) Familiarize yourself with the rules** so you don\'t get in trouble.\n' + '**B) Introduce yourself** Say hello in <#238956364729155585> and talk a little about yourself!\n' + '**C) Get a shiny new role** to display what you can help the most with in <#275071813992710144>.\n' + '**D) Start a discussion or ask for help** in the respective channels.\n' + '**E) If you have a question, don\'t hesitate to ask it.** To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\n' + "**F) Display your knowledge** in one of our events <#446166388235829248>.\n\u200B" + "**G) Post what you have experience with** in <#450080745499656223> and look for others with similar interests.\n\u200B"
    }, {
      name: '2. HWH Bot',
      value: '**A) Server Commands** —\n' + '• `@Staff <@USER> <OFFENSE>` to submit a report.\n' + '• `?ta5` macro that quickly displays \'If you have a question, don\'t hesitate to ask it. To save time, post it instead of asking "Does anyone know X?" or "Can someone help with Y?"\'\n' + '**B) Direct Message Commands** —\n' + "\u2022 `>c <challenge id> <work>` for event submissions.\n\u200B" + "**C) Source code**: https://github.com/spjy/hwh-bot \u200B"
    }, {
      name: '3. MathBot',
      value: '**A) LaTeX Renderer** — You can beautify your math by converting LaTeX into beautiful images. Use `=tex your LaTeX code here`.\n' + "**B) Wolfram Alpha Queryer** \u2014 Use MathBot to query Wolfram Alpha for mathematical computations or other knowledge. Use `=wolf wolfram alpha query`. Only usable in #spam-channel.\n\u200B"
    }, {
      name: '4. Contributing',
      value: '**A) Valued Contributor** — If you display considerable knowledge, activity and maturity in the help channels, you will be recognized as a valued contributor.\n' + "**B) Event Contributor** \u2014 If you have contributed a prompt to one of the Homework Help Events, you will receive this role.\n\u200B"
    }, {
      name: '5. Staff Positions',
      value: '**A) Moderators** keep the peace of the server and complete various tasks that need to be done around the server.\n' + '**B) Guides** also keep the peace of the server. They welcome people, answer people\'s questions about the server and warn people of rule offenses.\n' + '**C) Event Managers** organize events and create prompts for them.\n' + "**D) Applying for staff** \u2014 If you want to apply for Guide or Event Manager, apply here: <https://goo.gl/forms/Z3mVQwLdiNZcKHx52>\n\u200B"
    }, {
      name: '8. Help Mentioning',
      value: '**A)** Use `?mention <message id of question> <role>[ <role>]` in the channel you want to mention in to create a \'key\'.\n' + '**B)** You may use up to two related pings, e.g. Math Algebra.\n' + '**C)** For roles with multiple words, separate them with `-`, e.g. Social-Science\n' + '**D)** After 15 minutes, you may use `?mention` to redeem your key in the same channel you used the command.\n' + '**E)** To cancel a mention, type `?mention cancel`. \n' + '**F)** Example: `?mention 484484358879707136 Social-Science Psychology` \n' + 'To get your message ID, follow: https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-'
    }, {
      name: '9. Partnering & Advertising',
      value: '**A) To be eligible to be a partner, you must have:**\n' + '• At least 1/4 of Homework Help\'s members.' + '• Less than 15 partners.' + '• Our server and invite link be posted in a channel to recognize the partnership (and not under an NSFW lock).' + '**B)** If you do not fulfill the above requirements, your server will be posted in #advertise. If you do, it will be posted in #partners.' + '**C) Applying for partnership or to advertise**: https://goo.gl/forms/ltqYN19xlYZ2HuXq1'
    }, {
      name: '6. Sharing the server',
      value: "The more people that join, the more knowledge that can be shared! Consequently, I encourage everybody to share the server with your friends!\n\nShare link: https://discord.gg/YudDZtb \n\u200B"
    }], 'Homework Help Bot'));
  }

  _createClass(Tips, [{
    key: "execute",
    value: function execute() {
      _get(_getPrototypeOf(Tips.prototype), "sendToCurrentChannel", this).call(this);
    }
  }]);

  return Tips;
}(_embed.default);

exports.default = Tips;