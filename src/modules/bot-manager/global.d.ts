import type { DataSource } from 'typeorm'
import type { FastifyInstance } from 'fastify'

import type BotController from './entry-points/bot.controller.js'
import type ChatController from './entry-points/chat.controller.js'
import type MessageController from './entry-points/message.controller.js'

import type BotRepository from './data-access/bot.repository.js'
import type ChatRepository from './data-access/chat.repository.js'
import type MessageRepository from './data-access/message.repository.js'

import type BotService from './domain/bot.service.ts'
import type ChatService from './domain/chat.service.ts'
import type MessageService from './domain/message.service.ts'

declare global {
  type Controller = {
    init: (fastify: FastifyInstance) => void
  }

  type DI = {
    botController: BotController
    chatController: ChatController
    messageController: MessageController

    botService: BotService
    chatService: ChatService
    messageService: MessageService

    botRepository: BotRepository
    chatRepository: ChatRepository
    messageRepository: MessageRepository

    db: DataSource
  }
}
