import awilix from 'awilix'

import BotController from './entry-points/bot.controller.js'
import BotService from './domain/bot.service.js'
import BotRepository from './data-access/bot.repository.js'
import ChatRepository from './data-access/chat.repository.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<BotObserverDI> => {
  const moduleContainer = awilix.createContainer<BotObserverDI>({ injectionMode: awilix.InjectionMode.PROXY })

  return moduleContainer.register({
    ...container.registrations,

    botController: awilix.asClass(BotController).singleton(),
    botService: awilix.asClass(BotService).singleton(),
    botRepository: awilix.asClass(BotRepository).singleton(),
    chatRepository: awilix.asClass(ChatRepository).singleton()
  })
}

export default di
