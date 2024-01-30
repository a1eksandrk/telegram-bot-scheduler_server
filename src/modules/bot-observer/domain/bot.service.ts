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
    const observers = botEntities.map(entity => new ObserverService(entity, this.chatRepository))

    await this.watch(observers)
  }

  public handleBotConnected = (botEntity: BotEntity): void => {
    const observerService = new ObserverService(botEntity, this.chatRepository)

    observerService.watch()
  }

  private async watch (observers: ObserverService[]): Promise<void> {
    await Promise.allSettled(observers.map(async observer => { await observer.watch() }))
  }
}

export default BotService
