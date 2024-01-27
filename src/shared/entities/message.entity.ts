import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm'

import BotEntity from '#shared/entities/bot.entity.js'
import ChatEntity from '#shared/entities/chat.entity.js'

@Entity()
class MessageEntity {
  @PrimaryColumn('text')
    messageId: string

  @Column('text')
    text: string

  @Column('timestamptz')
    timestamp: string

  @ManyToOne(() => BotEntity, bot => bot.messages, { cascade: true })
    bot: BotEntity

  @ManyToOne(() => ChatEntity, chat => chat.messages, { cascade: true })
    chat: ChatEntity
}

export default MessageEntity