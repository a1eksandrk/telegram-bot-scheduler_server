import type { Repository } from 'typeorm'
import type BotEntity from '#modules/bot-scheduler/data-access/entity.js'
import type ChatEntity from '#modules/chat/data-access/entity.js'
import type MessageEntity from '#modules/message/data-access/entity.js'

export type Entities = {
  BotEntity: typeof BotEntity
  ChatEntity: typeof ChatEntity
  MessageEntity: typeof MessageEntity
}

export type Repositories = {
  botRepository: Repository<BotEntity>
  chatRepository: Repository<ChatEntity>
  messageRepository: Repository<MessageEntity>
}
