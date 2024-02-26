import { Entity, Column, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'

import UserEntity from '#shared/entities/user.entity.js'

@Entity()
class RefrechTokenEntity {
  @PrimaryGeneratedColumn('increment')
    tokenId: string

  @Column('text')
    token: string

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date | null

  @Column({ type: 'timestamptz' })
    expirationTime: Date

  @OneToOne(() => UserEntity, user => user.refreshToken)
    user: Relation<UserEntity>
}

export default RefrechTokenEntity
