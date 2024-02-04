import ArchivedMessageEntity from '#shared/entities/archived-message.entity.js'

import type { EntityManager, Repository } from 'typeorm'

class ArchivedMessageRepository {
  private readonly repository: Repository<ArchivedMessageEntity>

  public constructor (private readonly db: EntityManager) {
    this.repository = this.db.getRepository(ArchivedMessageEntity)
  }

  public async saveMany (archivedMessageEntity: ArchivedMessageEntity[]): Promise<ArchivedMessageEntity[]> {
    return await this.repository.save(archivedMessageEntity)
  }
}

export default ArchivedMessageRepository
