import type BotController from './entry-points/bot.controller.js'
import type BotService from './domain/bot.service.ts'
import type BotRepository from './data-access/bot.repository.js'
import type ChatRepository from './data-access/chat.repository.js'

declare global {
  type BotObserverDI = DI & {
    botController: BotController
    botService: BotService
    botRepository: BotRepository
    botRepository: BotRepository
    chatRepository: ChatRepository
  }
}

export {}
