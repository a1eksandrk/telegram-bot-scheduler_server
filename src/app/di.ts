import { diContainer } from '@fastify/awilix'
import { Lifetime, asFunction, asValue } from 'awilix'

import BotEntity from '#modules/bot-scheduler/data-access/entity.js'
import ChatEntity from '#modules/chat/data-access/entity.js'
import MessageEntity from '#modules/message/data-access/entity.js'
import BotService from '#modules/bot-scheduler/domain/bot-service.js'

import type { Entities, Services, Repositories } from '#shared/types.js'

const entities: Entities = {
  BotEntity,
  ChatEntity,
  MessageEntity
}

const createServices = (cradle: DI): Services => ({
  botService: new BotService(cradle)
})

const createRepositories = ({ db, entities }: DI): Repositories => ({
  botRepository: db.getRepository(entities.BotEntity),
  chatRepository: db.getRepository(entities.ChatEntity),
  messageRepository: db.getRepository(entities.MessageEntity)
})

const di = (db: DB): void => {
  diContainer.register({
    services: asFunction(
      createServices,
      { lifetime: Lifetime.SINGLETON }
    )
  })

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
