/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
const fs = require('fs');

module.exports = (collection) => {
  // require and export all .js files in same directory as this file
  fs.readdirSync(__dirname).forEach((value) => {
    if (value === 'index.js') {
      return;
    }

    if (fs.lstatSync(`${__dirname}/${value}`).isFile() && value.endsWith('.js')) {
      const directory = __dirname.split('\\');
      const name = value.replace('.js', '');
      const event = require(`./${value}`);

      collection.set(`${directory[directory.length - 1]}::${name}`, event);
    }
  });
};
