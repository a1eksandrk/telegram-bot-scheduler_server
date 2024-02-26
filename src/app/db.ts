import 'reflect-metadata'

import { DataSource } from 'typeorm'

import env from '#shared/configs/env.js'
import { PinoTypeOrmLogger } from '#shared/libs/log.js'

import BotEntity from '#shared/entities/bot.entity.js'
import UserEntity from '#shared/entities/user.entity.js'
import ChatEntity from '#shared/entities/chat.entity.js'
import MessageEntity from '#shared/entities/message.entity.js'
import RefreshTokenEntity from '#shared/entities/refresh-token.entity.js'
import ArchivedMessageEntity from '#shared/entities/archived-message.entity.js'

const DB_TYPE = 'postgres'

const entities = [BotEntity, UserEntity, ChatEntity, MessageEntity, RefreshTokenEntity, ArchivedMessageEntity]

const db = new DataSource({
  type: DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  entities,
  logging: true,
  logger: new PinoTypeOrmLogger(),
  synchronize: true
})

export default db
