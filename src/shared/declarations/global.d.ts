import type BotEntityType from '#modules/bot-scheduler/data-access/entity.js'
import type ChatEntityType from '#modules/chat/data-access/entity.js'
import type MessageEntityType from '#modules/message/data-access/entity.js'
import type { JSONSchema7 } from 'json-schema'
import type { Cradle } from '@fastify/awilix'
import type { DataSource } from 'typeorm'

declare global {
  type DI = Cradle
  type DB = DataSource
  type BotEntity = BotEntityType
  type ChatEntity = ChatEntityType
  type MessageEntity = MessageEntityType
  type JSONSchema = JSONSchema7
}
