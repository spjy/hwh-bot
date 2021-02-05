/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
import Discord from 'discord.js';
import fs from 'fs';

export default function (collection: Discord.Collection<string, any>) {
  // require and export all .js files in same directory as this file
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync(`${__dirname}/${file}`).isDirectory()) {
      import(`./${file}`)
      .then((f) => {
        f.default(collection)
      }); // Get all folders and require them
    }
  });
};
