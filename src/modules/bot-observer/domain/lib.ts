import type { TelegramChat } from 'puregram/generated'

export const buildChatName = (chat: TelegramChat): string => {
  if (chat.first_name && chat.last_name) return chat.first_name + ' ' + chat.last_name

  if (chat.title) return chat.title

  return ''
}
