import awilix from 'awilix'

import MessageController from './entry-points/message.controller.js'
import MessageService from './domain/message.service.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<MessageSchedulerDI> => {
  const moduleContainer = awilix.createContainer<MessageSchedulerDI>({ injectionMode: awilix.InjectionMode.PROXY })

  return moduleContainer.register({
    ...container.registrations,

    messageController: awilix.asClass(MessageController).singleton(),
    messageService: awilix.asClass(MessageService).singleton()
  })
}

export default di
