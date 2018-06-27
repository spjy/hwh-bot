/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
const fs = require('fs');
const path = require('path');

module.exports = (collection) => {
  // Get all of the scripts in directory and add it to a Discord collection
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync(path.format({ dir: __dirname, base: file })).isFile()
      && file.endsWith('.js')) {
      const directory = __dirname.split(path.sep); // get current folder name
      const name = file.replace('.js', ''); // get file name excluding .js
      const event = require(`./${file}`); // get event file

      // Add event to Discord collection (Name format: event::filename)
      collection.set(`${directory[directory.length - 1]}::${name}`, event);
    }
  });
};
