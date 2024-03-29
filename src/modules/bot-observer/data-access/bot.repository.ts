import BotEntity from '#shared/entities/bot.entity.js'

import type { DataSource, Repository } from 'typeorm'

class BotRepository {
  private readonly db: DataSource
  private readonly repository: Repository<BotEntity>

  public constructor ({ db }: BotObserverDI) {
    this.db = db
    this.repository = this.db.getRepository(BotEntity)
  }

  public async find (): Promise<BotEntity[]> {
    return await this.repository.find()
  }
}

export default BotRepository
