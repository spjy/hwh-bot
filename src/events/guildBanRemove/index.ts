/* eslint "import/no-dynamic-require": "off", "global-require": "off" */
import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

export default function (collection: Discord.Collection<string, any>) {
  // Get all of the scripts in directory and add it to a Discord collection
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.ts' || file === 'index.js') return; // ignore index.js file

    if (fs.lstatSync(path.format({ dir: __dirname, base: file })).isFile()
      && (file.endsWith('.ts') || file.endsWith('.js'))) {
      const directory = __dirname.split(path.sep); // get current folder name
      const name = file.endsWith('.ts') ? file.replace('.ts', '') : file.replace('.js', ''); // get file name excluding .js
      const event = require(`./${file}`); // get event file

      // Add event to Discord collection (Name format: event::filename)
      collection.set(`${directory[directory.length - 1]}::${name}`, event);
    }
  });
};
