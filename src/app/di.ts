import { diContainer } from '@fastify/awilix'
import { asValue } from 'awilix'

import BotEntity from '#modules/bot-scheduler/data-access/entity.js'

import type { AwilixContainer } from 'awilix'
import type { DataSource } from 'typeorm'

const di = (db: DataSource): AwilixContainer => {
  return diContainer.register({
    botRepository: asValue(db.getRepository(BotEntity))
  })
}

export default di
