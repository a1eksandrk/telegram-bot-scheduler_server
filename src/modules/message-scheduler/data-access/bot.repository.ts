import BotEntity from '#shared/entities/bot.entity.js'

import type { EntityManager, Repository } from 'typeorm'

class BotRepository {
  private readonly repository: Repository<BotEntity>

  public constructor (private readonly db: EntityManager) {
    this.repository = this.db.getRepository(BotEntity)
  }

  public async findById (botId: string): Promise<BotEntity | null> {
    return await this.repository.findOneBy({ botId })
  }
}

export default BotRepository
