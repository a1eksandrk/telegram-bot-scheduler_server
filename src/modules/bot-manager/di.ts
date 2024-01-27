import awilix from 'awilix'

import BotController from './entry-points/bot.controller.js'
import ChatController from './entry-points/chat.controller.js'
import MessageController from './entry-points/message.controller.js'

import BotRepository from './data-access/bot.repository.js'
import ChatRepository from './data-access/chat.repository.js'
import MessageRepository from './data-access/message.repository.js'

import BotService from './domain/bot.service.js'
import ChatService from './domain/chat.service.js'
import MessageService from './domain/message.service.js'

import type { AwilixContainer } from 'awilix'

const di = (container: AwilixContainer<DI>): AwilixContainer<DI> => {
  container.register({
    botController: awilix.asClass(BotController).singleton(),
    chatController: awilix.asClass(ChatController).singleton(),
    messageController: awilix.asClass(MessageController).singleton(),

    botRepository: awilix.asClass(BotRepository).singleton(),
    chatRepository: awilix.asClass(ChatRepository).singleton(),
    messageRepository: awilix.asClass(MessageRepository).singleton(),

    botService: awilix.asClass(BotService).singleton(),
    chatService: awilix.asClass(ChatService).singleton(),
    messageService: awilix.asClass(MessageService).singleton()
  })

  return container
}

export default di
