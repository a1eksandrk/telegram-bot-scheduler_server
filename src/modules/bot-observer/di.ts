import awilix from 'awilix'

import BotController from './entry-points/bot.controller.js'
import BotRepository from './data-access/bot.repository.js'
import BotService from './domain/bot.service.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<BotObserverDI> => {
  const moduleContainer = container as AwilixContainer<BotObserverDI>

  return moduleContainer.register({
    botController: awilix.asClass(BotController).singleton(),
    botRepository: awilix.asClass(BotRepository).singleton(),
    botService: awilix.asClass(BotService).singleton()
  })
}

export default di
