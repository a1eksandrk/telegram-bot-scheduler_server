import { Entity, Column, JoinTable, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm'

import ChatEntity from '#shared/entities/chat.entity.js'
import MessageEntity from '#shared/entities/message.entity.js'

@Entity()
class BotEntity {
  @PrimaryColumn('text')
    botId: string

  @Column('text')
    token: string

  @ManyToMany(() => ChatEntity, chat => chat.bots, { cascade: true })
  @JoinTable()
    chats: ChatEntity[]

  @OneToMany(() => MessageEntity, message => message.bot)
    messages: MessageEntity[]
}

export default BotEntity
