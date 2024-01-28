import BotDTO from './bot.dto.js'
import ObserverService from './observer.service.js'

import type BotEntity from '#shared/entities/bot.entity.js'

class BotService {
  private readonly botRepository: BotObserverDI['botRepository']
  private readonly chatRepository: BotObserverDI['chatRepository']

  public constructor ({ botRepository, chatRepository }: BotObserverDI) {
    this.botRepository = botRepository
    this.chatRepository = chatRepository
  }

  public async init (): Promise<void> {
    const botEntities = await this.botRepository.find()
    const bots = botEntities.map(entity => new BotDTO(entity))
    const observers = bots.map(bot => new ObserverService(bot, this.chatRepository))

    await this.watch(observers)
  }

  public handleBotConnected = (botEntity: BotEntity): void => {
    const bot = new BotDTO(botEntity)
    const observerService = new ObserverService(bot, this.chatRepository)

    observerService.watch()
  }

  private async watch (observers: ObserverService[]): Promise<void> {
    await Promise.allSettled(observers.map(async observer => { await observer.watch() }))
  }
}

export default BotService
