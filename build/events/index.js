"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
var fs = require('fs');

module.exports = function (collection) {
  // require and export all .js files in same directory as this file
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync("".concat(__dirname, "/").concat(file)).isDirectory()) {
      require("./".concat(file))(collection); // Get all folders and require them

    }
  });
};