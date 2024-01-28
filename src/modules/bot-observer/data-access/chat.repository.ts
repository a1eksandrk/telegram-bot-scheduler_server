import ChatEntity from '#shared/entities/chat.entity.js'

import type { DataSource, Repository } from 'typeorm'

class ChatRepository {
  private readonly db: DataSource
  private readonly repository: Repository<ChatEntity>

  public constructor ({ db }: BotObserverDI) {
    this.db = db
    this.repository = this.db.getRepository(ChatEntity)
  }

  public async save (chatEntity: ChatEntity): Promise<ChatEntity> {
    return await this.repository.save(chatEntity)
  }
}

export default ChatRepository
