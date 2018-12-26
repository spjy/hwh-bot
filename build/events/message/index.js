"use strict";

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
var fs = require('fs');

var path = require('path');

module.exports = function (collection) {
  // Get all of the scripts in directory and add it to a Discord collection
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync(path.format({
      dir: __dirname,
      base: file
    })).isFile() && file.endsWith('.js')) {
      var directory = __dirname.split(path.sep); // get current folder name


      var name = file.replace('.js', ''); // get file name excluding .js

      var event = require("./".concat(file)); // get event file
      // Add event to Discord collection (Name format: event::filename)


      collection.set("".concat(directory[directory.length - 1], "::").concat(name), event);
    }
  });
};