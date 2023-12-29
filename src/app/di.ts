import { diContainer } from '@fastify/awilix'
import { Lifetime, asFunction, asValue } from 'awilix'

import BotEntity from '#modules/bot-scheduler/data-access/entity.js'
import ChatEntity from '#modules/chat/data-access/entity.js'
import MessageEntity from '#modules/message/data-access/entity.js'

import type { Cradle } from '@fastify/awilix'
import type { DataSource } from 'typeorm'
import type { Entities, Repositories } from '#shared/types.js'

const entities: Entities = {
  BotEntity,
  ChatEntity,
  MessageEntity
}

const createRepositories = ({ db, entities }: Cradle): Repositories => ({
  botRepository: db.getRepository(entities.BotEntity),
  chatRepository: db.getRepository(entities.ChatEntity),
  messageRepository: db.getRepository(entities.MessageEntity)
})

const di = (db: DataSource): void => {
  diContainer.register({
    repositories: asFunction(
      createRepositories,
      { lifetime: Lifetime.SINGLETON }
    )
  })

  diContainer.register({
    db: asValue(db),
    entities: asValue(entities)
  })
}

export default di
