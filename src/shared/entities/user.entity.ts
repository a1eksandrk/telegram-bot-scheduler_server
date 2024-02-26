import { Entity, Column, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'

import RefrechTokenEntity from '#shared/entities/refresh-token.entity.js'

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn('increment')
    userId: string

  @Column('text')
    username: string

  @Column('text')
    email: string

  @Column('text')
    password: string

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @OneToOne(() => RefrechTokenEntity, refreshToken => refreshToken.user)
    refreshToken: Relation<RefrechTokenEntity>
}

export default UserEntity
