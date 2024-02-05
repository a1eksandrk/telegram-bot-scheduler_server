import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class ArchivedMessageEntity {
  @PrimaryGeneratedColumn('uuid')
    archivedMessageId: string

  @Column('uuid')
    messageId: string

  @Column('text')
    text: string

  @Column('timestamptz')
    timestamp: Date

  @Column('text')
    botId: string

  @Column('text')
    chatId: string
}

export default ArchivedMessageEntity
