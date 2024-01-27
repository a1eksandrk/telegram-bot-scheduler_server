import type BotController from './entry-points/bot.controller.js'
import type BotRepository from './data-access/bot.repository.js'
import type BotService from './domain/bot.service.ts'

declare global {
  type BotObserverDI = DI & {
    botController: BotController
    botService: BotService
    botRepository: BotRepository
  }
}

export {}
