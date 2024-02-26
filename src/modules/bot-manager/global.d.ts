import type { FastifyInstance } from 'fastify'

import type BotController from './entry-points/bot.controller.ts'
import type ChatController from './entry-points/chat.controller.ts'
import type MessageController from './entry-points/message.controller.ts'

import type BotService from './domain/bot.service.ts'
import type ChatService from './domain/chat.service.ts'
import type MessageService from './domain/message.service.ts'

import type BotRepository from './data-access/bot.repository.ts'
import type ChatRepository from './data-access/chat.repository.ts'
import type MessageRepository from './data-access/message.repository.ts'

declare global {
  type BotManagerController = {
    register: (fastify: FastifyInstance) => Promise<void>
  }

  type BotManagerDI = DI & {
    botController: BotController
    chatController: ChatController
    messageController: MessageController

    botService: BotService
    chatService: ChatService
    messageService: MessageService

    botRepository: BotRepository
    chatRepository: ChatRepository
    messageRepository: MessageRepository
  }
}

export {}
