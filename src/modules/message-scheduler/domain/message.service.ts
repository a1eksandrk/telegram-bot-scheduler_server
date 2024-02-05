import { logger } from '#shared/libs/log.js'

import { convertToInterval, send } from './lib.js'

import BotRepository from '../data-access/bot.repository.js'
import MessageRepository from '../data-access/message.repository.js'
import ArchivedMessageRepository from '../data-access/archived-message.repository.js'

import type { DataSource } from 'typeorm'

class MessageService {
  private readonly db: DataSource

  public constructor ({ db }: MessageSchedulerDI) {
    this.db = db
  }

  public async broadcast (timestamp: Date): Promise<void> {
    const interval = convertToInterval(timestamp)

    const qr = this.db.createQueryRunner()

    await qr.connect()
    await qr.startTransaction()

    const botRepository = new BotRepository(qr.manager)
    const messageRepository = new MessageRepository(qr.manager)
    const archivedMessageRepository = new ArchivedMessageRepository(qr.manager)

    try {
      const messages = await messageRepository.findByInterval(interval)

      if (!messages.length) { await qr.rollbackTransaction(); return }

      const archivedMessages = await archivedMessageRepository.saveMany(messages)

      if (!archivedMessages.length) { await qr.rollbackTransaction(); return }

      let sendedCount = 0

      for (const message of messages) {
        try {
          const bot = await botRepository.findById(message.bot.botId)

          if (!bot) continue

          const messageInfo = await send(bot, message)

          logger.info(messageInfo.result, `message sent successfully - ${messageInfo.result.message_id}`)

          sendedCount++
        } catch (error) {
          logger.error(error, `sending failed on message ${message.messageId}`)
        }
      }

      logger.info(archivedMessages, `The number of messages sent - ${sendedCount}`)

      await messageRepository.removeMany(messages)

      await qr.commitTransaction()
    } catch (error) {
      logger.error(error, `transaction failed on ${timestamp.toISOString()}`)

      await qr.rollbackTransaction()
    } finally {
      await qr.release()
    }
  }
}

export default MessageService
