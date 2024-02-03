import MessageEntity from '#shared/entities/message.entity.js'
import { buildWhereParams } from '#shared/libs/query.js'

import type { DataSource, Repository } from 'typeorm'

type FindFilter = {
  botId: string | null
  chatId: string | null
}

class MessageRepository {
  private readonly db: DataSource
  private readonly repository: Repository<MessageEntity>

  public constructor ({ db }: BotManagerDI) {
    this.db = db
    this.repository = this.db.getRepository(MessageEntity)
  }

  public async find ({ botId, chatId }: FindFilter): Promise<MessageEntity[]> {
    const botAlias = 'bot'
    const chatAlias = 'chat'

    return await this.repository.createQueryBuilder('messsage')
      .innerJoin('messsage.bot', botAlias)
      .where(...buildWhereParams(botAlias, 'botId', botId))
      .innerJoin('messsage.chat', chatAlias)
      .where(...buildWhereParams(chatAlias, 'chatId', chatId))
      .getMany()
  }

  public async save (messageEntity: MessageEntity): Promise<MessageEntity> {
    return await this.repository.save(messageEntity)
  }

  public async removeOneById (messageId: string): Promise<MessageEntity | null> {
    const foundMessage = await this.repository.findOneBy({ messageId })

    if (!foundMessage) return null

    return await this.repository.remove(foundMessage)
  }
}

export default MessageRepository
