import { Entity, Column, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

import BotEntity from '#shared/entities/bot.entity.js'
import MessageEntity from '#shared/entities/message.entity.js'

@Entity()
class ChatEntity {
  @PrimaryColumn('text')
    chatId: string

  @Column('text')
    name: string

  @Column('text', { nullable: true })
    image: string | null

  @ManyToMany(() => BotEntity, bot => bot.chats)
    bots: BotEntity[]

  @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[]
}

export default ChatEntity
