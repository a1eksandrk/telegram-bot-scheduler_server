import 'reflect-metadata'

import { DataSource } from 'typeorm'

import env from '#shared/configs/env.js'

import BotEntity from '#modules/bot-scheduler/data-access/entity.js'

const DB_TYPE = 'postgres'

const db = new DataSource({
  type: DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  entities: [BotEntity],
  logging: true,
  synchronize: true
})

export default db
