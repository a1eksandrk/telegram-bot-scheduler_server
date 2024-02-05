import ArchivedMessageEntity from '#shared/entities/archived-message.entity.js'

import type { EntityManager, Repository } from 'typeorm'
import type MessageEntity from '#shared/entities/message.entity.js'

const archiveMessages = (messages: MessageEntity[]): ArchivedMessageEntity[] => {
  return messages.map(message => {
    const archivedMessageEntity = new ArchivedMessageEntity()

    archivedMessageEntity.messageId = message.messageId
    archivedMessageEntity.text = message.text
    archivedMessageEntity.timestamp = message.timestamp
    archivedMessageEntity.botId = message.bot.botId
    archivedMessageEntity.chatId = message.chat.chatId

    return archivedMessageEntity
  })
}

class ArchivedMessageRepository {
  private readonly repository: Repository<ArchivedMessageEntity>

  public constructor (private readonly db: EntityManager) {
    this.repository = this.db.getRepository(ArchivedMessageEntity)
  }

  public async saveMany (messageEntity: MessageEntity[]): Promise<ArchivedMessageEntity[]> {
    return await this.repository.save(archiveMessages(messageEntity))
  }
}

export default ArchivedMessageRepository
