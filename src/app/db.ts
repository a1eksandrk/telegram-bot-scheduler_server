import 'reflect-metadata'

import { DataSource } from 'typeorm'

import env from '#shared/configs/env.js'

import BotEntity from '#shared/entities/bot.entity.js'
import ChatEntity from '#shared/entities/chat.entity.js'
import MessageEntity from '#shared/entities/message.entity.js'

const DB_TYPE = 'postgres'

const entities = [BotEntity, ChatEntity, MessageEntity]

const db = new DataSource({
  type: DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  entities,
  logging: true,
  synchronize: true
})

export default db
