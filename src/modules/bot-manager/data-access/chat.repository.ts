import ChatEntity from '#shared/entities/chat.entity.js'
import { buildWhereParams } from '#shared/libs/query.js'

import type { DataSource, Repository } from 'typeorm'

type FindManyFilter = {
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

  public async findMany ({ botId }: FindManyFilter): Promise<ChatEntity[]> {
    const botsAlias = 'bot'

    return await this.repository.createQueryBuilder('chat')
      .innerJoin('chat.bots', botsAlias)
      .leftJoinAndSelect('chat.messages', 'message')
      .where(...buildWhereParams(botsAlias, 'botId', botId))
      .getMany()
  }
}

export default ChatRepository
