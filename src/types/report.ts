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
    emoji: '🫙',
    label: 'No action',
    value: dispositions.NO_ACTION,
  },
  {
    emoji: '🗒️',
    label: 'Note',
    value: dispositions.NOTE,
  },
  {
    emoji: '🦜',
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
    emoji: '🍦',
    label: 'Softban',
    value: dispositions.SOFTBAN,
  },
  {
    emoji: '🔨',
    label: 'Ban',
    value: dispositions.BAN,
  },
];
