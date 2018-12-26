"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.replace");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv-extended').load();

var Raven = require('raven');

var dialogflow = require('dialogflow');

module.exports = {
  description: 'DialogFlow',
  execute: function () {
    var _execute = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(message) {
      var content, author, sessionClient, sessionPath, request, responses, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              content = message.cleanContent, author = message.author;

              if (process.env.DIALOGFLOW_PROJECT_ID) {
                _context.next = 5;
                break;
              }

              // eslint-disable-next-line
              console.warn('DialogFlow not configured.');
              return _context.abrupt("return");

            case 5:
              sessionClient = new dialogflow.SessionsClient({
                projectId: process.env.DIALOGFLOW_PROJECT_ID,
                credentials: {
                  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
                  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n')
                }
              });
              sessionPath = sessionClient.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, author.id);
              request = {
                session: sessionPath,
                queryInput: {
                  text: {
                    text: String(content),
                    languageCode: 'en-US'
                  }
                }
              };
              _context.next = 10;
              return sessionClient.detectIntent(request);

            case 10:
              responses = _context.sent;
              result = responses[0].queryResult;
              _context.next = 14;
              return message.reply(result.fulfillmentText);

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              Raven.captureException(_context.t0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 16]]);
    }));

    function execute(_x) {
      return _execute.apply(this, arguments);
    }

    return execute;
  }()
};