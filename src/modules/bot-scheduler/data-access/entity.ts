import { Entity, Column, JoinTable, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm'

import ChatEntity from '#modules/chat/data-access/entity.js'
import MessageEntity from '#modules/message/data-access/entity.js'

@Entity()
class BotEntity {
  @PrimaryColumn('int')
  botId: number

  @Column('text')
  token: string

  @ManyToMany(() => ChatEntity, chat => chat.bots, { cascade: true })
  @JoinTable()
  chats: ChatEntity[]

  @OneToMany(() => MessageEntity, message => message.bot)
  messages: MessageEntity[]
}

export default BotEntity
