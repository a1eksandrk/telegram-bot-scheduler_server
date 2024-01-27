// import awilix from 'awilix'

// import BotController from './entry-points/bot.controller.js'

// import BotRepository from './data-access/bot.repository.js'

// import BotService from './domain/bot.service.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<DI> => {
  container.register({
    // botController: awilix.asClass(BotController).singleton(),

    // botRepository: awilix.asClass(BotRepository).singleton(),

    // botService: awilix.asClass(BotService).singleton(),
  })

  return container
}

export default di
