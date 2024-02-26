import { Entity, Column, OneToMany, ManyToMany, PrimaryColumn, type Relation } from 'typeorm'

import ChatEntity from '#shared/entities/chat.entity.js'
import MessageEntity from '#shared/entities/message.entity.js'

@Entity()
class BotEntity {
  @PrimaryColumn('text')
    botId: string

  @Column('text')
    token: string

  @ManyToMany(() => ChatEntity, chat => chat.bots)
    chats: Relation<ChatEntity[]>

  @OneToMany(() => MessageEntity, message => message.bot)
    messages: Relation<MessageEntity[]>
}

export default BotEntity
