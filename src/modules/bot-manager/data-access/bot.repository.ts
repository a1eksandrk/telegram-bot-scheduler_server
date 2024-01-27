import BotEntity from '#shared/entities/bot.entity.js'

import type { DataSource, Repository } from 'typeorm'

class BotRepository {
  private readonly db: DataSource
  private readonly repository: Repository<BotEntity>

  public constructor ({ db }: BotManagerDI) {
    this.db = db
    this.repository = this.db.getRepository(BotEntity)
  }

  public async findOneById (botId: string): Promise<BotEntity | null> {
    return await this.repository.findOneBy({ botId })
  }

  public async findOneByToken (token: string): Promise<BotEntity | null> {
    return await this.repository.findOneBy({ token })
  }

  public async save (botEntity: BotEntity): Promise<BotEntity> {
    return await this.repository.save(botEntity)
  }
}

export default BotRepository
