import UserEntity from '#shared/entities/user.entity.js'

import type { DataSource, Repository } from 'typeorm'

class UserRepository {
  private readonly db: DataSource
  private readonly repository: Repository<UserEntity>

  public constructor ({ db }: UserManagerDI) {
    this.db = db
    this.repository = this.db.getRepository(UserEntity)
  }

  public async create (userEntity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(userEntity)
  }

  public async delete (userId: string): Promise<UserEntity | null> {
    const foundUserEntity = await this.repository.findOneBy({ userId })

    if (!foundUserEntity) return null

    return await this.repository.remove(foundUserEntity)
  }

  public async findOneByUsername (username: string): Promise<UserEntity | null> {
    return await this.repository.findOneBy({ username })
  }

  public async findOneByEmail (email: string): Promise<UserEntity | null> {
    return await this.repository.findOneBy({ email })
  }
}

export default UserRepository
