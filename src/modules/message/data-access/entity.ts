import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm'

import BotEntity from '#modules/bot-scheduler/data-access/entity.js'
import ChatEntity from '#modules/chat/data-access/entity.js'

@Entity()
class MessageEntity {
  @PrimaryColumn('text')
    messageid: string

  @Column('text')
    text: string

  @Column('timestamptz')
    datetime: string

  @ManyToOne(() => BotEntity, bot => bot.messages, { cascade: true })
    bot: BotEntity

  @ManyToOne(() => ChatEntity, chat => chat.messages, { cascade: true })
    chat: ChatEntity
}

export default MessageEntity
