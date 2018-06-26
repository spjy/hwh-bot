/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
const fs = require('fs');

module.exports = (collection) => {
  // require and export all .js files in same directory as this file
  fs.readdirSync(__dirname).forEach((value) => {
    if (value === 'index.js') {
      return;
    }

    if (fs.lstatSync(`${__dirname}/${value}`).isDirectory()) {
      require(`./${value}`)(collection);
    }
  });
};
