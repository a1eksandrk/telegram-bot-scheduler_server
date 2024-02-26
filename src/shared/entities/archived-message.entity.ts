import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class ArchivedMessageEntity {
  @PrimaryGeneratedColumn('increment')
    archivedMessageId: string

  @Column('text')
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
