import type { Repository } from 'typeorm'
import type BotEntity from '#modules/bot-scheduler/data-access/entity.js'
import type ChatEntity from '#modules/chat/data-access/entity.js'
import type MessageEntity from '#modules/message/data-access/entity.js'
import type BotService from '#modules/bot-scheduler/domain/bot-service.js'

export type Services = {
  botService: BotService
}

export type Entities = {
  BotEntity: new () => BotEntity
  ChatEntity: new () => ChatEntity
  MessageEntity: new () => MessageEntity
}

export type Repositories = {
  botRepository: Repository<BotEntity>
  chatRepository: Repository<ChatEntity>
  messageRepository: Repository<MessageEntity>
}
