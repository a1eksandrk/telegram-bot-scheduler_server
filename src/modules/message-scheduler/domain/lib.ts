import type BotEntity from '#shared/entities/bot.entity.js'
import type MessageEntity from '#shared/entities/message.entity.js'

export type Interval = {
  before: Date
  after: Date
}

export type MessageInfo = {
  ok: true
  result: {
    message_id: number
    date: number
    text: string
  }
}

export type MessageError = {
  ok: false
  description: string
}

export const convertToInterval = (timestamp: Date, increaseMs = 30 * 1000): Interval => {
  const before = new Date(timestamp.getTime() - increaseMs)
  const after = new Date(timestamp.getTime() + increaseMs)

  return { before, after }
}

export const send = async (bot: BotEntity, message: MessageEntity): Promise<MessageInfo> => {
  const headers = {
    'Content-Type': 'application/json'
  }

  const body = JSON.stringify({
    chat_id: Number(message.chat.chatId),
    text: message.text
  })

  const response = await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, { method: 'POST', headers, body })
  const json = await response.json() as MessageInfo | MessageError

  if (!json.ok) throw new Error(json.description)

  return json
}
