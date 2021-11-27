export interface MentionStore {
  channel: string,
  message: string,
  cooldownDate: Date,
  mention: string,
  attachment: string
}
