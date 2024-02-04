import BotRepository from '../data-access/bot.repository.js'
import MessageRepository from '../data-access/message.repository.js'
import ArchivedMessageRepository from '../data-access/archived-message.repository.js'

import type { QueryRunner } from 'typeorm'
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

export const convertToInterval = (timestamp: Date): Interval => {
  const before = new Date(timestamp.getTime() - 30 * 1000)
  const after = new Date(timestamp.getTime() + 30 * 1000)

  return { before, after }
}

export const extractMessages = async (qr: QueryRunner, interval: Interval): Promise<MessageEntity[] | null> => {
  const messageRepository = new MessageRepository(qr.manager)
  const messages = await messageRepository.findByInterval(interval)

  if (!messages.length) return null

  const deletedMessages = await messageRepository.removeMany(messages)

  return deletedMessages
}

export const archiveMessages = async (qr: QueryRunner, messages: MessageEntity[]): Promise<MessageEntity[] | null> => {
  const archivedMessageRepository = new ArchivedMessageRepository(qr.manager)
  const archivedMessages = await archivedMessageRepository.saveMany(messages)

  if (!archivedMessages.length) return null

  return archivedMessages
}

export const findBot = async (qr: QueryRunner, botId: string): Promise<BotEntity | null> => {
  const botRepository = new BotRepository(qr.manager)
  return await botRepository.findById(botId)
}

export const send = async (bot: BotEntity, message: MessageEntity): Promise<MessageInfo> => {
  const body = JSON.stringify({
    chat_id: Number(message.chat.chatId),
    text: message.text
  })

  const response = await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, { method: 'POST', body })
  const json = await response.json() as MessageInfo | MessageError

  if (!json.ok) throw new Error(json.description)

  return json
}
