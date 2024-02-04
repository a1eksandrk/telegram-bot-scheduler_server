import { Between } from 'typeorm'

import MessageEntity from '#shared/entities/message.entity.js'

import type { EntityManager, Repository } from 'typeorm'

type FindInterval = {
  before: Date
  after: Date
}

class MessageRepository {
  private readonly repository: Repository<MessageEntity>

  public constructor (private readonly db: EntityManager) {
    this.repository = this.db.getRepository(MessageEntity)
  }

  public async findByInterval ({ before, after }: FindInterval): Promise<MessageEntity[]> {
    return await this.repository.findBy({ timestamp: Between(before, after) })
  }

  public async removeMany (messageEntities: MessageEntity[]): Promise<MessageEntity[]> {
    return await this.repository.remove(messageEntities)
  }
}

export default MessageRepository
