import { logger } from '#shared/libs/log.js'

import { convertToInterval, extractMessages, archiveMessages, findBot, send } from './lib.js'

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

    try {
      const extractedMessages = await extractMessages(qr, interval)

      if (!extractedMessages) { await qr.rollbackTransaction(); return }

      const archivedMessages = await archiveMessages(qr, extractedMessages)

      if (!archivedMessages) { await qr.rollbackTransaction(); return }

      let sendedCount = 0

      for (const message of archivedMessages) {
        try {
          const bot = await findBot(qr, message.bot.botId)

          if (!bot) continue

          const messageInfo = await send(bot, message)

          logger.info(messageInfo.result, `message sent successfully - ${messageInfo.result.message_id}`)

          sendedCount++
        } catch (error) {
          logger.error(error, `sending failed on message ${message.messageId}`)
        }
      }

      logger.info(archivedMessages, `The number of messages sent - ${sendedCount}`)

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
