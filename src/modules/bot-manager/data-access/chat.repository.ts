import ChatEntity from '#shared/entities/chat.entity.js'
import { buildWhereParams } from '#shared/libs/query.js'

import type { DataSource, Repository } from 'typeorm'

type FindFilter = {
  botId: string | null
}

class ChatRepository {
  private readonly db: DataSource
  private readonly repository: Repository<ChatEntity>

  public constructor ({ db }: BotManagerDI) {
    this.db = db
    this.repository = this.db.getRepository(ChatEntity)
  }

  public async findOneById (chatId: string): Promise<ChatEntity | null> {
    return await this.repository.findOneBy({ chatId })
  }

  public async removeOneById (chatId: string): Promise<ChatEntity | null> {
    const foundEntity = await this.findOneById(chatId)

    if (!foundEntity) return null

    return await this.repository.remove(foundEntity)
  }

  public async find ({ botId }: FindFilter): Promise<ChatEntity[]> {
    const botsAlias = 'bot'

    return await this.repository.createQueryBuilder('chat')
      .innerJoin('chat.bots', botsAlias)
      .leftJoinAndSelect('chat.messages', 'message')
      .where(...buildWhereParams(botsAlias, 'botId', botId))
      .getMany()
  }
}

export default ChatRepository
