import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

import BotEntity from '#shared/entities/bot.entity.js'
import ChatEntity from '#shared/entities/chat.entity.js'

@Entity()
class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
    messageId: string

  @Column('text')
    text: string

  @Column('timestamptz')
    timestamp: Date

  @ManyToOne(() => BotEntity, bot => bot.messages, { cascade: true, onDelete: 'CASCADE' })
    bot: Relation<BotEntity>

  @ManyToOne(() => ChatEntity, chat => chat.messages, { cascade: true, onDelete: 'CASCADE' })
    chat: Relation<ChatEntity>
}

export default MessageEntity
