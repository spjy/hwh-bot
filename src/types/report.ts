import { APISelectMenuOption } from 'discord.js';
import { dispositions } from './typedefs';

export const reportEmbedFields = [
  {
    name: 'Report',
    value: 'Thank you for the report. We will review it shortly.',
    inline: true,
  },
  {
    name: 'Staff Link',
    value: '-',
    inline: true,
  },
];

export const dispositionEntries = [
  {
    // emoji: '<:EverythingIsFine:266216698451853324>',
    label: 'No action',
    value: dispositions.NO_ACTION,
  },
  {
    // emoji: '<:PeepoNote:809186638789214290>',
    label: 'Note',
    value: dispositions.NOTE,
  },
  {
    // emoji: '<:YellingWoman:809187855804006410>',
    label: 'Verbal warning',
    value: dispositions.VERBAL_WARN,
  },
  {
    emoji: '✍️',
    label: 'Formal warning',
    value: dispositions.FORMAL_WARN,
  },
  {
    emoji: '🙊',
    label: 'Mute',
    value: dispositions.MUTE,
  },
  {
    emoji: '🦶',
    label: 'Kick',
    value: dispositions.KICK,
  },
  {
    // emoji: '<:blanketblob:821415890628902953>',
    label: 'Softban',
    value: dispositions.SOFTBAN,
  },
  {
    // emoji: '<:feelsbanman:716743099413561426>',
    label: 'Ban',
    value: dispositions.BAN,
  },
];
