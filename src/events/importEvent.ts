import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

export default function (dirname: string, collection: Discord.Collection<string, any>) {
  // Get all of the scripts in directory and add it to a Discord collection
  fs.readdirSync(dirname).forEach((file) => {
    if (file === 'index.ts') return; // ignore index.js file

    if (fs.lstatSync(path.format({ dir: dirname, base: file })).isFile()
      && file.endsWith('.ts')) {
      const directory = dirname.split(path.sep); // get current folder name
      const name = file.replace('.ts', ''); // get file name excluding .js
      const event = require(`./${file}`); // get event file

      // Add event to Discord collection (Name format: event::filename)
      collection.set(`${directory[directory.length - 1]}::${name}`, event);
    }
  });
};
