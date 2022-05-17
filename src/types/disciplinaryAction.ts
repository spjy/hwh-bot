import Discord from 'discord.js';

enum disciplinaryTypes {
  NOTE,
  WARN,
  MUTE,
  SOFTBAN,
  BAN,
}

interface disciplinaryAction {
  type: disciplinaryTypes;
  user: Discord.User;
  moderator: Discord.User;
  reason: String;
  log: String[];
}

export default abstract class IDisciplinaryAction {
  abstract save(action: disciplinaryAction): Promise<void>;
  abstract modify(): Promise<void>;
  abstract delete(): Promise<void>;
  abstract log(): Promise<void>;
}
