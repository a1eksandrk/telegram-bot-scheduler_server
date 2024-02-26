import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'

import BotEntity from '#shared/entities/bot.entity.js'
import ChatEntity from '#shared/entities/chat.entity.js'

@Entity()
class MessageEntity {
  @PrimaryGeneratedColumn('increment')
    messageId: string

  @Column('text')
    text: string

  @Column('timestamptz')
    timestamp: Date

  @ManyToOne(() => BotEntity, bot => bot.messages, { onDelete: 'CASCADE' })
    bot: Relation<BotEntity>

  @ManyToOne(() => ChatEntity, chat => chat.messages, { onDelete: 'CASCADE' })
    chat: Relation<ChatEntity>
}

export default MessageEntity
