/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
const fs = require('fs');

module.exports = (collection) => {
  // require and export all .js files in same directory as this file
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync(`${__dirname}/${file}`).isDirectory()) {
      require(`./${file}`)(collection); // Get all folders and require them
    }
  });
};
